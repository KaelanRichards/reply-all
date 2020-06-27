<template>
  <StackLayout class="home-panel">
    <CardView
      v-for="group in groups"
      :key="group.id"
      class="card"
      elevation="40"
      radius="10"
      ios:shadowRadius="3"
      @tap="goToGroupPage(group)"
    >
      <StackLayout v-if="group.isActive === true" class="card-layout">
        <Label class="h2" :text="group.groupName" />
        <Label class="body" textWrap="true" :text="group.groupUsers.length" />
      </StackLayout>
    </CardView>
  </StackLayout>
</template>

<script>
import routes from "~/router";

export default {
  props: {
    groups: Array,
  },
  data() {
    return {
      groupsArray: this.groups,
    };
  },
  methods: {
    goToGroupPage(group) {
      //navigate to create group page
      // this.$store.dispatch("setPrompts");
      this.$store.dispatch("setSelectedGroup", group);

      this.$navigateTo(
        routes.group
        // { clearHistory: true },
        // { backstackVisible: false }
      );
    },
  },
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
</style>
