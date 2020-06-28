<template>
  <Page>
    <!-- <RadDataForm :source="group" /> -->
    <StackLayout padding="5">
      <Label text="Chose The Next Prompt!"></Label>
      <TextField
        class="input"
        hint="create a prompt"
        keyboardType="email"
        returnKeyType="next"
        fontSize="18"
        v-model="prompt.promptText"
      />
      <Button
        v-for="prompt in randomPrompts"
        :key="prompt.id"
        :text="prompt.promptText"
        @tap="createPrompt(prompt)"
        class="btn btn-primary m-t-20"
      />

      <Button
        :text="'Random'"
        @tap="shufflePrompts"
        class="btn btn-primary m-t-20"
      />

      <Button
        :text="'Done'"
        @tap="createPrompt(prompt)"
        class="btn btn-primary m-t-20"
      />
    </StackLayout>
  </Page>
</template>

<script>
import routes from "~/router";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";

const loader = new LoadingIndicator();

export default {
  data() {
    return {
      prompt: {
        promptText: "",
      },
      randomPrompts: [],
    };
  },
  methods: {
    createPrompt(prompt) {
      loader.show(global.loaderOptions);
      this.$promptService
        .createPrompt(prompt)
        .then(() => {
          loader.hide();
          this.$navigateTo(
            routes.home
            // { clearHistory: true }
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          loader.hide();
          console.error(err);
        });
    },
    shufflePrompts() {
      const prompts = this.$store.state.prompts;
      let randomPrompts = [];
      const prompt1 = prompts[Math.floor(Math.random() * prompts.length)];
      randomPrompts.push(prompt1);
      this.randomPrompts = randomPrompts;
    },
  },
  created() {
    this.shufflePrompts();
  },
};
</script>

<style scoped>
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
</style>
