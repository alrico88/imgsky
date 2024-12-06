<template lang="pug">
div
  vite-pwa-manifest
  nuxt-loading-indicator
  b-navbar.nav-color.text-white(fixed="top")
    b-navbar-brand.text-white.fw-bold Imgsky
    b-navbar-nav
      b-nav-form(form-class="align-items-center hstack gap-2")
        .text-nowrap Viewing {{ imageItems.length }} images
        .text-nowrap.text-muted(v-if="isOverMaxPictures") (auto-paused)
        b-form-input(
          type="text",
          v-model="filterStr",
          placeholder="Posts containing...."
        )
        b-button.text-nowrap(@click="showSidebar = !showSidebar") #[icon(name="bi:sliders")] Settings
        b-button.text-nowrap(@click="clearAll", variant="info") #[icon(name="tabler:clear-all")] Clear
        stream-button(
          @click="handlePause",
          :stream-paused="paused",
          :disabled="isOverMaxPictures"
        )
  main.container-fluid.z-1
    .row.mb-2
      .col
        .grid-container.justify-content-center
          image-item(
            v-for="item of filteredImageItems",
            :key="item.did + item.imageLink",
            :did="item.did",
            :link="item.imageLink",
            :commit-rkey="item.commitRkey",
            :text="item.text",
            :link-to="linkTo",
            @item-hover="handleMouseOver",
            @item-stop="handleMouseLeave"
          )
  b-offcanvas(
    v-model="showSidebar",
    title="Settings",
    body-class="vstack gap-2",
    placement="end",
    :header-class="sidebarBg"
  )
    link-to-select(v-model="linkTo")
    batch-size-select(v-model="batchSize")
    image-size-input(v-model="height")
    auto-pause-input(v-model="maxPictures")
    b-alert.p-2(variant="info", :model-value="true") #[icon(name="tabler:info-circle")] Settings are saved to your browser's localStorage
  .post-tooltip.position-absolute.z-2(v-if="content", :style="tooltipStyle") {{ content }}
  the-credits
</template>

<script setup lang="ts">
import type { CommitCreateEvent } from "@skyware/jetstream";
import { PostLinkOptions, type ImageItem } from "~/types/post";

useSeoMeta({
  title: "Imgsky",
  description: "Watch the flow of images posted to Bluesky, live",
  keywords: "bluesky,images,live",
});

const batchSize = ref(40);

const { data, open, close } = useWebSocket(
  "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post"
);

const imageItems = ref<ImageItem[]>([]);
const filterStr = ref("");
const filteredImageItems = computed(() => {
  const trimmedVal = filterStr.value.trim();

  if (trimmedVal === "") {
    return imageItems.value;
  } else {
    return imageItems.value.filter((d) => d.text.includes(trimmedVal));
  }
});

let tempStorage: ImageItem[] = [];

watch(data, (val) => {
  const parsed = JSON.parse(val) as CommitCreateEvent<"app.bsky.feed.post">;

  if (parsed?.commit?.record?.embed?.$type === "app.bsky.embed.images") {
    const toInsert = parsed.commit.record.embed.images.map((image) => ({
      did: parsed.did,
      imageLink: image.image.ref.$link,
      commitRkey: parsed.commit.rkey,
      text: parsed.commit.record.text,
    }));

    tempStorage.push(...toInsert);
  }

  if (tempStorage.length > batchSize.value) {
    imageItems.value.push(...tempStorage);
    tempStorage = [];
  }
});

const paused = ref(false);
watch(paused, (val) => {
  if (val) {
    close();
  } else {
    open();
  }
});

const maxPictures = useLocalStorage("maxPictures", 5000);
const isOverMaxPictures = computed(
  () => imageItems.value.length >= maxPictures.value
);
whenever(isOverMaxPictures, () => {
  paused.value = true;
});

function handlePause() {
  paused.value = !paused.value;
}

const content = ref<string | null>(null);
const tooltipPos = reactive({
  x: 0,
  y: 0,
});
const tooltipStyle = computed(() => ({
  top: `${tooltipPos.y}px`,
  left: `${tooltipPos.x + 10}px`,
}));

function handleMouseOver({
  x,
  y,
  text,
}: {
  x: number;
  y: number;
  text: string;
}): void {
  content.value = text;
  tooltipPos.x = x;
  tooltipPos.y = y;
}

function handleMouseLeave() {
  content.value = null;
}

function clearAll() {
  imageItems.value = [];
  tempStorage = [];
}

const linkTo = useLocalStorage("linkTo", PostLinkOptions.Image);

const showSidebar = ref(false);

const height = useLocalStorage("imageHeight", 200);
const imgHeight = computed(() => `${height.value < 0 ? 0 : height.value}px`);

const colorMode = useColorMode();

const sidebarBg = computed(() =>
  colorMode.value === "light" ? "bg-light" : "bg-dark"
);
</script>

<style lang="scss">
main {
  padding-top: 60px;
}

.nav-color {
  background-color: rgba($color: #000000, $alpha: 0.7);
}

.grid-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  .grid-item {
    img {
      height: v-bind(imgHeight);
      max-width: 100%;
    }
  }
}

.post-tooltip {
  color: white;
  background-color: #000000;
  max-width: 300px;
  padding: 10px;
  pointer-events: none;
}
</style>
