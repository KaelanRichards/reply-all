<template>
  <page>
    <StackLayout>
      <label text="Respond"></label>
      <ProgressPrompt columns="30" promptName="Shmoney Team"></ProgressPrompt>
      <label text="Respond"></label>
    </StackLayout>
  </page>
</template>

<script>
import ProgressPrompt from "./components/ProgressBar.vue";

export default {
  components: {
    ProgressPrompt,
  },
};
</script>

<style></style>
