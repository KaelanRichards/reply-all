<template>
  <Page>
    <!-- <RadDataForm :source="group" /> -->
    <StackLayout padding="5">
      <TextField
        class="input"
        hint="Enter Group Name"
        keyboardType="email"
        autocorrect="false"
        autocapitalizationType="none"
        v-model="groupForm.groupName"
        returnKeyType="next"
        @returnPress="focusPassword"
        fontSize="18"
      />
      <Label text="Select Group Member" />
      <RadAutoCompleteTextView
        :items="autocompleteCountries"
        suggestMode="Suggest"
        displayMode="Tokens"
        v-model="groupForm.groupMembers"
      >
        <SuggestionView ~suggestionView>
          <StackLayout
            v-suggestionItemTemplate
            orientation="vertical"
            padding="10"
          >
            <v-template scope="item">
              <Label :text="item.text" />
            </v-template>
          </StackLayout>
        </SuggestionView>
      </RadAutoCompleteTextView>
      <Button
        :text="'Create Group'"
        @tap="createGroup"
        class="btn btn-primary m-t-20"
      />
    </StackLayout>
  </Page>
</template>

<script>
const observableArrayModule = require("tns-core-modules/data/observable-array");
const ObservableArray = observableArrayModule.ObservableArray;
const autocompleteModule = require("nativescript-ui-autocomplete");
export default {
  data() {
    return {
      // If I want to use raddatforms
      //   group: {
      //     groupName: "Group Name",
      //     groupMembers: [],
      //   },
      groupForm: {
        groupName: "",
        groupMembers: [],
      },

      autocompleteCountries: new ObservableArray([
        new autocompleteModule.TokenModel("Kaelan Richards", undefined),
        new autocompleteModule.TokenModel("Andrew Han", undefined),
        new autocompleteModule.TokenModel("Axl Patalinghug", undefined),
        new autocompleteModule.TokenModel("Jake Kusasz", undefined),
        new autocompleteModule.TokenModel("Drew Hagge", undefined),
        new autocompleteModule.TokenModel("Blake Pozolo", undefined),
      ]),
    };
  },
  methods() {
    //   createGroup() {
    //       // submit group object to firebase to create group
    //   },
  },
};
</script>

<style scoped>
.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}
</style>
