https://www.nativescript.org/blog/building-a-simple-progressbar-for-your-nativescript-app

<template>
  <StackLayout @tap="goToPage">
    <Label :text="promptNameVal" class="progressbar-text"></Label>

    <GridLayout :columns="columnsVal" class="progressbar">
      <StackLayout col="0" class="progressbar-value">
      </StackLayout> </GridLayout
  ></StackLayout>
</template>

<script>
import routes from "~/router";

export default {
  props: {
    columns: Number,
    promptName: String,
    promptType: String,
  },
  data() {
    return {
      propVal: this.propsVal,
      columnsVal: this.columns,
      promptNameVal: this.promptName,
      promptTypeVal: this.promptType,
    };
  },

  methods: {
    setProgressbarWidth(percent) {
      this.columns = percent + "*," + (100 - percent) + "*";
    },
    goToPage() {
      if (this.promptType === "vote") {
        this.$navigateTo(routes.vote);
      } else if (this.promptType === "respond") {
        this.$navigateTo(routes.respond);
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
}
.progressbar-value {
  background: #337ab7;
}
.progressbar-text {
  text-align: center;
}
</style>
