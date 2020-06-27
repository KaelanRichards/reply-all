<template>
  <Page>
    <GroupActionBar text="Hello"></GroupActionBar>
    <ScrollView>
      <StackLayout>
        <!-- downloaded a card component package to use but we chillin for now -->
        <!-- No styles applied -->
        <Button text="Create button" @tap="goToCreateGroup"></Button>
        <Button
          v-if="groupInvites.length != 0"
          :text="`check invites ${groupInvites.length}`"
          @tap="goToInvites"
        ></Button>
        <Card :groups="this.group"></Card>
        <Button text="log out" @tap="logOut"></Button>
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
      groupInvites: [],
    };
  },
  methods: {
    logOut() {
      this.$userService.logout().then(() => {
        this.$navigateTo(
          routes.login,
          { clearHistory: true }
          // { backstackVisible: false }
        );
      });
    },
    goToCreateGroup() {
      //navigate to create group page
      this.$navigateTo(
        routes.createGroup
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
    goToInvites() {
      this.$navigateTo(routes.invites, {
        animated: true,
        transition: {
          name: "slideLeft",
          curve: "easeInOut",
          duration: 100,
        },
        props: { groupInvites: this.groupInvites },
      });
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
        })
        .catch((err) => {
          console.error(err);
        });
    },
    getInvites() {
      this.$groupService
        .getInvites()
        .then((invites) => {
          this.groupInvites = invites;
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
  created() {
    this.getGroup();
    this.getInvites();
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
