import type { CommitCreateEvent } from "@skyware/jetstream";
import type { ImageItem } from "~/types/post";

export function useBluesky() {
  const { data, open, close } = useWebSocket(
    "wss://jetstream2.us-east.bsky.network/subscribe?wantedCollections=app.bsky.feed.post"
  );

  const imageItems = ref<ImageItem[]>([]);

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
  });

  useRafFn(() => {
    imageItems.value.push(...tempStorage);
    tempStorage = [];
  });

  function clearTempStorage() {
    tempStorage = [];
  }

  return {
    open,
    close,
    imageItems,
    clearTempStorage,
  };
}
