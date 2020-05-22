<template>
  <Page>
    <GroupActionBar text="Hello"></GroupActionBar>
    <ScrollView>
      <StackLayout>
        <!-- downloaded a card component package to use but we chillin for now -->
        <!-- No styles applied -->
        <Button text="Create button" @tap="goToCreateGroup"></Button>
        <Button text="group page" @tap="goToGroupPage"></Button>

        <Card :groups="this.group"></Card>
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script>
import routes from "~/router";
import GroupActionBar from "./components/GroupActionBar";
import Card from "./components/Card";

export default {
  components: {
    GroupActionBar,
    Card,
  },
  data() {
    return {
      group: [],
    };
  },
  methods: {
    goToCreateGroup() {
      //navigate to create group page
      this.$navigateTo(
        routes.createGroup
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
    goToGroupPage() {
      //navigate to create group page
      this.$navigateTo(
        routes.group
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
    getGroup() {
      this.$groupService
        .getGroups()
        .then((groupArray) => {
          this.group = groupArray;
          console.log("Supposedly this a group array??, we'll see", this.group);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getGroup();
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
  /* android-elevation: 4; */
  background-color: lightseagreen;
  border-color: darkolivegreen;
  border-radius: 20;
  border-width: 1;
  color: whitesmoke;
  font-size: 18;
  font-weight: bold;
}

.my-button:active {
  /* android-elevation: 8; */
  background-color: whitesmoke;
  border-color: darkolivegreen;
  border-radius: 20;
  border-width: 1;
  color: lightseagreen;
  font-size: 18;
  font-weight: bold;
}
</style>
