<template lang="pug">
b-form-group(label="Muted keywords", description="Case insensitive")
  b-form-tags(v-model="mutedKeywords")
</template>

<script setup lang="ts">
const mutedKeywords = defineModel<string[]>();
</script>
