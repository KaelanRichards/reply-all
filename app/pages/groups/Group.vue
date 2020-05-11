<template>
  <page>
    <StackLayout>
      <label text="Respond"></label>
      <ProgressPrompt
        :columns="60"
        :promptName="promptName"
        :promptType="promptType.respond"
      ></ProgressPrompt>
      <label text="Vote"></label>
      <ProgressPrompt
        :columns="75"
        :promptName="promptName"
        :promptType="promptType.vote"
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
  data() {
    return {
      progess: 30,
      promptName: "You mom is FAT!!!!",
      promptType: {
        vote: "vote",
        respond: "respond",
      },
    };
  },
};
</script>

<style></style>
