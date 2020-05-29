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
        :text="'Create prompt'"
        @tap="createPrompt"
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
    };
  },

  methods: {
    createPrompt() {
      loader.show(global.loaderOptions);
      this.$groupService
        .createPrompt(this.prompt)
        .then(() => {
          loader.hide();
          this.$navigateTo(
            routes.home,
            { clearHistory: true }
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          loader.hide();
          console.error(err);
        });
    },
  },
};
</script>

<style scoped>
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
</style>
