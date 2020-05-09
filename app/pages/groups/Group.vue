<template>
  <page>
    <StackLayout>
      <label text="Respond"></label>
      <ProgressPrompt
        columns="30"
        promptName="It's killing season apparently?"
        promptType="respond"
      ></ProgressPrompt>
      <label text="Vote"></label>
      <ProgressPrompt
        columns="30"
        promptName="You mom is FAT!!!!"
        promptType="vote"
      ></ProgressPrompt>
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
