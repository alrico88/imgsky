<template lang="pug">
transition-fade
  nuxt-link.grid-item(
    v-show="imageLoaded",
    :to="url",
    target="_blank",
    @mousemove="handleMouseOver",
    @mouseleave="handleMouseLeave"
  )
    nuxt-img.flex-grow(:src="thumbSrc", @load="imageLoaded = true")
</template>

<script setup lang="ts">
import { PostLinkOptions } from "~/types/post";

const props = defineProps<{
  did: string;
  link: string;
  text: string;
  commitRkey: string;
  linkTo: PostLinkOptions;
}>();

const emit = defineEmits<{
  (e: "item-hover", val: { x: number; y: number; text: string }): void;
  (e: "item-stop"): void;
}>();

const imageLoaded = ref(false);

const url = computed(() =>
  props.linkTo === PostLinkOptions.Post
    ? `https://bsky.app/profile/${props.did}/post/${props.commitRkey}`
    : `https://cdn.bsky.app/img/feed_fullsize/plain/${props.did}/${props.link}@jpeg`
);

const thumbSrc = computed(
  () =>
    `https://cdn.bsky.app/img/feed_thumbnail/plain/${props.did}/${props.link}@jpeg`
);

function handleMouseOver(e: MouseEvent): void {
  emit("item-hover", {
    x: e.pageX,
    y: e.pageY,
    text: props.text,
  });
}

function handleMouseLeave() {
  emit("item-stop");
}
</script>
