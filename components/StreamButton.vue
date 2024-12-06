<template lang="pug">
b-button.text-nowrap(:variant="btnProps.variant", :disabled="disabled")
  icon(:name="btnProps.icon")
  |
  | {{ btnProps.text }}
</template>

<script setup lang="ts">
import type { ButtonVariant } from "bootstrap-vue-next";

const props = defineProps<{
  streamPaused: boolean;
  disabled: boolean;
}>();

const btnProps = computed(() =>
  props.streamPaused
    ? {
        icon: "tabler:play",
        variant: "primary" as ButtonVariant,
        text: "Resume",
      }
    : {
        icon: "tabler:pause",
        variant: "secondary" as ButtonVariant,
        text: "Pause",
      }
);
</script>
