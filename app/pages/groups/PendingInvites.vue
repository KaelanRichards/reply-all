<template>
  <Page>
    <StackLayout>
      <FlexboxLayout
        flexDirection="column"
        v-for="(invite, inviteIndex) in groupInvites"
        :key="inviteIndex"
      >
        <Label :text="invite.groupName" />
        <Label :text="invite.groupCreator" />
        <Button text="accept" @tap="acceptInvite(invite.id)"></Button>
        <Button text="decline" @tap="acceptInvite(invite.id)"></Button>
      </FlexboxLayout>
    </StackLayout>
  </Page>
</template>

<script>
import routes from "~/router";

export default {
  name: "prompt-respond",

  props: {
    groupInvites: {
      type: Array,
    },
  },
  data() {
    return {
      // groupInvites: [],
    };
  },
  methods: {
    goToGroupPage(group) {
      //navigate to create group page
      // this.$store.dispatch("setPrompts");
      this.$navigateTo(
        routes.group
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
    acceptInvite(groupId) {
      this.$groupService
        .acceptInvite(groupId)
        .then(() => {
          this.$navigateTo(
            routes.home
            // { clearHistory: true }
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    declineInvite(groupId) {
      this.$groupService
        .declineInvite(groupId)
        .then(() => {
          this.$navigateTo(
            routes.home
            // { clearHistory: true },
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          console.error(err);
        });
    },
    // getInvites() {
    //   this.$groupService
    //     .getInvites()
    //     .then((invites) => {
    //       this.groupInvites = invites;
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //     });
    // },
  },
  // created() {
  //   this.getInvites();
  // },
};
</script>
<style scoped>
.card {
  background-color: #fff;
  color: #4d4d4d;
  margin: 15 15 0;
}
.card-layout {
  padding: 20;
}
.card-layout .h1 {
  margin-bottom: 15;
}
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
</style>
