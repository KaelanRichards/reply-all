https://www.nativescript.org/blog/building-a-simple-progressbar-for-your-nativescript-app

<template>
  <StackLayout @tap="goToPage">
    <GridLayout :columns="columnsVal" class="progressbar">
      <StackLayout col="0" class="progressbar-value"> </StackLayout>
      <Label :text="promptNameVal" class="progressbar-text"></Label>
    </GridLayout>
  </StackLayout>
</template>

<script>
import routes from "~/router";

export default {
  props: {
    columns: Number,
    promptName: String,
    promptType: String,
    promptId: String,
  },
  data() {
    return {
      propVal: this.propsVal,
      columnsVal: this.columns,
      promptNameVal: this.promptName,
    };
  },

  methods: {
    setProgressbarWidth(percent) {
      this.columns = percent + "*," + (100 - percent) + "*";
    },
    goToPage() {
      let prompt = {
        promptName: this.promptName,
        promptId: this.promptId,
      };
      if (this.promptType === "vote") {
        this.$navigateTo(routes.vote, {
          animated: true,
          transition: {
            name: "slideLeft",
            curve: "easeInOut",
            duration: 100,
          },
          props: { prompt: prompt },
        });
      } else if (this.promptType === "respond") {
        this.$navigateTo(routes.respond, {
          animated: true,
          transition: {
            name: "slideLeft",
            curve: "easeInOut",
            duration: 100,
          },
          props: { prompt: prompt },
        });
      }
    },
  },
  created() {
    this.setProgressbarWidth(20);
  },
};
</script>

<style>
.progressbar {
  height: 50;
  margin: 10;
  border-radius: 10;
  border-color: black;
  border-width: 1;
  text-align: center;
}
.progressbar-value {
  background: #d3d3d3;
}
.progressbar-text {
}
</style>
