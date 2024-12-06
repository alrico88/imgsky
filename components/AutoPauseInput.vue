<template lang="pug">
b-form-group(label="Pause automatically at")
  b-input-group(append="images")
    b-form-input(v-model.number="pauseAt", type="number", :min="0")
</template>

<script setup lang="ts">
const pauseAt = defineModel<number>();
</script>
