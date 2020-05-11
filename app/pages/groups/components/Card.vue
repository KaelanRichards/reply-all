<template>
  <StackLayout class="home-panel">
    <CardView
      v-for="group in groupsArray"
      :key="group.id"
      class="card"
      elevation="40"
      radius="10"
      ios:shadowRadius="3"
    >
      <StackLayout class="card-layout">
        <Label class="h2" :text="group.heading" />
        <Label class="body" textWrap="true" :text="group.content" />
      </StackLayout>
    </CardView>
  </StackLayout>
</template>

<script>
export default {
  props: {
    groups: Array
  },
  data() {
    return {
      groupsArray: this.groups
    };
  }
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
