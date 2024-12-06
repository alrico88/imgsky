<template lang="pug">
b-form-group(label="Update batch size")
  b-form-select(:options="[20, 40, 80, 100]", v-model="batchSize")
</template>

<script setup lang="ts">
const batchSize = defineModel<number>();
</script>
