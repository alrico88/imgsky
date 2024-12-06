<template lang="pug">
.credits.text-nowrap.text-white.bg-dark.p-3.hstack.gap-2.align-items-center
  div made by #[nuxt-link.fw-bold(to="https://www.alrico.es", target="_blank") Alberto Rico]
  div(v-for="link of links", :key="link.url")
    nuxt-link(:to="link.url", target="_blank") #[icon(size="25", :name="link.icon")]
</template>

<script setup lang="ts">
const links = [
  {
    url: "https://github.com/alrico88/imgsk",
    icon: "bi:github",
  },
  {
    url: "https://bsky.app/profile/alrico.dev",
    icon: "tabler:brand-bluesky",
  },
  {
    url: "https://buymeacoffee.com/albertorico",
    icon: "simple-icons:buymeacoffee",
  },
];
</script>

<style lang="scss" scoped>
.credits {
  position: fixed;
  bottom: 0;
  right: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}
</style>
