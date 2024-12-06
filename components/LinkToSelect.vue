<template lang="pug">
b-form-group(label="Link to")
  b-form-select(:options="options", v-model="linkTo")
</template>

<script setup lang="ts">
import { PostLinkOptions } from "~/types/post";

const linkTo = defineModel<PostLinkOptions>();

const options = [
  {
    text: "Link to post",
    value: PostLinkOptions.Post,
  },
  {
    text: "Full-res image",
    value: PostLinkOptions.Image,
  },
];
</script>
