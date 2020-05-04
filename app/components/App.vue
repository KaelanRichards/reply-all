<template>
  <Page>
    <StackLayout>
      <!-- downloaded a card component package to use but we chillin for now -->
      <!-- No styles applied -->
      <Button text="Button" @tap="goToCreateGroup"></Button>
    </StackLayout>
  </Page>
</template>

<script>
import routes from "../router";

export default {
  data() {
    return {};
  },
  methods: {
    goToCreateGroup() {
      //navigate to create group page
      this.$navigateTo(routes.createGroup);
    },
  },
};
</script>

<style scoped>
/* ActionBar {
  background-color: #ffffff;
  color: #ffffff;
} */
.page {
  background-color: rgb(237, 237, 237);
}

.cardStyle {
  background-color: #fff;
  color: rgb(43, 43, 43);
}

.cardContent {
  padding: 20;
  font-weight: bold;
  font-size: 30;
}

.my-button {
  android-elevation: 4;
  background-color: lightseagreen;
  border-color: darkolivegreen;
  border-radius: 20;
  border-width: 1;
  color: whitesmoke;
  font-size: 18;
  font-weight: bold;
}

.my-button:active {
  android-elevation: 8;
  background-color: whitesmoke;
  border-color: darkolivegreen;
  border-radius: 20;
  border-width: 1;
  color: lightseagreen;
  font-size: 18;
  font-weight: bold;
}
</style>
