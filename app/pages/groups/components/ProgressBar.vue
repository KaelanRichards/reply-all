https://www.nativescript.org/blog/building-a-simple-progressbar-for-your-nativescript-app

<template>
  <StackLayout>
    <Label :text="promptName" class="progressbar-text"></Label>

    <GridLayout :columns="columns" class="progressbar">
      <StackLayout col="0" class="progressbar-value">
      </StackLayout> </GridLayout
  ></StackLayout>
</template>

<script>
export default {
  props: {
    columns: Number,
    promptName: String,
  },

  methods: {
    setProgressbarWidth(percent) {
      this.columns = percent + "*," + (100 - percent) + "*";
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
