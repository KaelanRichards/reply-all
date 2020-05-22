<template>
  <Page>
    <!-- <RadDataForm :source="group" /> -->
    <StackLayout padding="5">
      <Label text="Select Group Name"></Label>
      <TextField
        class="input"
        hint="Enter Group Name"
        keyboardType="email"
        returnKeyType="next"
        fontSize="18"
      />
      <Label text="Select Group Members" />
      <TextField
        class="input"
        hint="Enter Group Name"
        keyboardType="email"
        returnKeyType="next"
        fontSize="18"
        v-model="filterText"
      />
      <!-- @textChange="debouncedInput" -->

      <ScrollView>
        <ListView
          for="person in filteredPeople"
          class="list-group"
          @itemTap="onItemTap"
        >
          <v-template>
            <GridLayout class="list-group-item" rows="*" columns="auto, *">
              <!-- <Image row="0" col="0" :src="item.src" class="thumb img-circle" /> -->
              <Label row="0" col="1" :text="person.FirstName" />
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
      <Button
        :text="'Create Group'"
        @tap="createGroup"
        class="btn btn-primary m-t-20"
      />
    </StackLayout>
  </Page>
</template>

<script>
import routes from "~/router";
import { debounce } from "~/helper";

export default {
  data() {
    return {
      groupForm: {
        groupName: "",
        groupMembers: [],
      },
      filterText: null,
      debouncedInput: "",
      people: [
        {
          FirstName: "Kaelan",
          LastName: "Richards",
          Email: "kadokaelan@gmail.com",
        },
        {
          FirstName: "Blake",
          LastName: "Pozolo",
          Email: "blakep@gmail.com",
        },
        {
          FirstName: "Andrew",
          LastName: "Han",
          Email: "A_Han@gmail.com",
        },
      ],
    };
  },
  computed: {
    filteredPeople() {
      // If there is no filter text, just return everyone
      if (!this.debouncedInput) return this.people;
      console.log("tehehe", this.people);
      // Convert the search text to lower case
      let searchText = this.debouncedInput.toLowerCase();

      // Use the standard javascript filter method of arrays
      // to return only people whose first name or last name
      // includes the search text
      return this.people.filter((p) => {
        // if IE support is required and not pre-compiling,
        // use indexOf instead of includes
        return (
          p.FirstName.toLowerCase().includes(searchText) ||
          p.LastName.toLowerCase().includes(searchText)
        );
      });
    },
  },
  methods: {
    onItemTap: function(event) {
      console.log("You tapped: " + this.$data.items[event.index].text);
    },
    createGroup() {
      this.$groupService
        .createGroup(groupForm)
        .then((group) => {
          console.log("Supposedly this a group array??, we'll see", group);
          navigateToGroupHome();
        })
        .catch((err) => {
          console.error(err);
        });
    },
    navigateToGroupHome() {
      this.$navigateTo(
        routes.home
        // { backstackVisible: false }
      );
    },
  },
  watch: {
    // https://stackoverflow.com/a/53486112
    filterText: debounce(function(newVal) {
      console.log("YEeeeeeeeee", newVal);
      this.debouncedInput = newVal;
    }, 1000),
  },
};
</script>

<style scoped>
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
</style>
