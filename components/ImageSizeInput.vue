<template lang="pug">
b-form-group(label="Image height")
  b-input-group(append="pixels")
    b-form-input(v-model.number="height", type="number", :min="0")
</template>

<script setup lang="ts">
const height = defineModel<number>();
</script>
