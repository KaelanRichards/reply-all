<template>
  <page>
    <StackLayout>
      <label :text="group.groupName"></label>
      <Button text="Create Prompt" @tap="goToCreatePrompt"></Button>

      <label text="Respond"></label>
      <ProgressPrompt
        v-for="vote in votePrompts"
        :key="vote.id"
        :columns="60"
        :promptName="vote.promptText"
        promptType="respond"
      ></ProgressPrompt>
      <label text="Vote"></label>
      <ProgressPrompt
        v-for="response in responsePrompts"
        :key="response.id"
        :columns="75"
        :promptName="response.promptText"
        promptType="vote"
      ></ProgressPrompt>
    </StackLayout>
  </page>
</template>

<script>
import ProgressPrompt from "./components/ProgressBar.vue";
import routes from "~/router";

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
  methods: {
    goToCreatePrompt() {
      //navigate to create group page
      this.$navigateTo(
        routes.createPrompt
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
  },
  computed: {
    group() {
      return this.$store.state.selectedGroup;
    },
    responsePrompts() {
      if (this.$store.state.selectedGroup.activePrompts) {
        return this.$store.state.selectedGroup.activePrompts.filter(
          (prompt) => prompt.isResponding === true
        );
      }
    },
    votePrompts() {
      if (this.$store.state.selectedGroup.activePrompts) {
        return this.$store.state.selectedGroup.activePrompts.filter(
          (prompt) => prompt.isVoting === true
        );
      }
    },
  },
};
</script>

<style></style>
