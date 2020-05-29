import firebase from "nativescript-plugin-firebase";

import store from "~/store";
const state = store.state;

// collection.where()
// Firestore supports advanced querying with the where function.
// Those where clauses can be chained to form logical 'AND' queries:

// You can use the operators defined in firestore.WhereFilterOp,
// which are: '<' | '<=' | '==' | '>=' | '>' | 'in' | 'array-contains' | 'array-contains-an

export default class GroupService {
  async getGroups() {
    let groups = [];

    try {
      const userGroupsSnapShot = await firebase.firestore
        .collection("groups")
        .where("groupUsers", "array-contains", state.user.uid)
        .get();

      userGroupsSnapShot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        console.log("this the doc", docData);
        groups.push(docData);
      });

      return Promise.resolve(groups);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  async createGroup(group) {
    try {
      // Add a new document with a generated id.
      firebase.firestore.collection("groups").add({
        groupName: group.groupName,
        invitedUsers: group.groupMembers,
        groupUsers: [state.user.uid],
      });
    } catch (error) {
      console.log(error);
    }
  }

  async createPrompt(prompt) {
    try {
      // Add a new document with a generated id.
      firebase.firestore
        .collection("groups")
        .doc(state.selectedGroup.id)
        .update({
          activePrompts: firebase.firestore.FieldValue.arrayUnion({
            isResponding: true,
            isVoting: false,
            promptText: prompt.promptText,
          }),
        });
    } catch (error) {
      console.log(error);
    }
  }
}
