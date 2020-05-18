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
    console.log("User ID", state.user.uid);
    let groups = [];

    const userGroupsSnapShot = await firebase.firestore
      .collection("groups")
      .where("groupUsers", "array-contains", state.user.uid)
      .get();

    userGroupsSnapShot.forEach((doc) => groups.push(doc.data()));

    console.log("Group Documents", groups);
    return groups;
  }
  async createGroup(group) {
    // Add a new document with a generated id.
    firebase.firestore.collection("groups").add({
      groupName: group.groupName,
      invitedUsers: group.groupMembers,
    });
  }
}
