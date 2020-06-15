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
        v-model="groupForm.groupName"
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
        <ListView for="person in people" @itemTap="onItemTap" v-show="people">
          <v-template>
            <GridLayout class="list-group-item" rows="*" columns="auto, *">
              <Label
                row="0"
                col="1"
                :text="`${person.name.firstName} ${person.name.lastName}`"
              />
              <Label marginTop="20" row="1" col="1" :text="person.userName" />
            </GridLayout>
          </v-template>
        </ListView>
      </ScrollView>
      <Button
        :text="'Create Group'"
        @tap="createGroup"
        class="btn btn-primary m-t-20"
      />
      <ListView for="member in groupForm.groupMembers">
        <v-template>
          <GridLayout class="list-group-item" rows="*" columns="auto, *">
            <Label :text="member" />
          </GridLayout>
        </v-template>
      </ListView>
    </StackLayout>
  </Page>
</template>

<script>
import routes from "~/router";
import { debounce } from "~/helper";
import { LoadingIndicator } from "@nstudio/nativescript-loading-indicator";

const loader = new LoadingIndicator();

export default {
  data() {
    return {
      groupForm: {
        groupName: "",
        groupMembers: [],
      },
      filterText: null,
      debouncedInput: "",
      people: [],
    };
  },

  methods: {
    onItemTap: function(event) {
      console.log("event", this.$data.people[event.index].userId);
      this.groupForm.groupMembers.push(this.$data.people[event.index].userId);
      this.people = [];
      this.filterText = "";
    },
    createGroup() {
      loader.show(global.loaderOptions);
      this.$groupService
        .createGroup(this.groupForm)
        .then((group) => {
          loader.hide();
          this.$navigateTo(
            routes.home,
            { clearHistory: true }
            // { backstackVisible: false }
          );
        })
        .catch((err) => {
          loader.hide();
          console.error(err);
        });
    },

    getSearchResults(text) {
      console.log("IS THIS UNDEFINED", text);
      loader.show(global.loaderOptions);
      this.$searchService
        .searchByName(text)
        .then((searchresults) => {
          this.people = searchresults;
          loader.hide();
        })
        .catch((e) => {
          console.log(e);
          loader.hide();
        });
    },
  },
  watch: {
    // https://stackoverflow.com/a/53486112
    filterText: debounce(function(newVal) {
      this.debouncedInput = newVal;
      if (!this.debouncedInput) {
        this.people = [];
      } else {
        this.getSearchResults(this.debouncedInput);
      }
    }, 500),
  },
};
</script>

<style scoped>
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
</style>
