import firebase from "nativescript-plugin-firebase";

import store from "~/store";
import PromptService from "~/services/PromptService";

export const promptService = new PromptService();

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
      await firebase.firestore.collection("groups").add({
        groupName: group.groupName,
        invitedUsers: group.groupMembers,
        groupUsers: [state.user.uid],
        isActive: false,
        groupCreator: state.user.displayName,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getInvites() {
    let invites = [];

    try {
      const userGroupsSnapShot = await firebase.firestore
        .collection("groups")
        .where("invitedUsers", "array-contains", state.user.uid)
        .get();

      userGroupsSnapShot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        invites.push(docData);
      });

      return Promise.resolve(invites);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async makeGroupActive(groupIdString) {
    try {
      await firebase.firestore
        .collection("groups")
        .doc(groupIdString)
        .update({
          isActive: true,
        });

      const prompts = state.prompts;
      const prompt = prompts[Math.floor(Math.random() * prompts.length)];
      await promptService.createPrompt(prompt, groupIdString).catch((err) => {
        console.error(err);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async acceptInvite(groupId) {
    const groupIdString = String(groupId);
    const userIdString = String(state.user.uid);
    try {
      await firebase.firestore
        .collection("groups")
        .doc(groupIdString)
        .update({
          invitedUsers: firebase.firestore.FieldValue.arrayRemove(userIdString),
          groupUsers: firebase.firestore.FieldValue.arrayUnion(userIdString),
        });
      await this.getInvitedUsers(groupIdString).then((users) => {
        if (users.length === 0) {
          this.makeGroupActive(groupIdString);
        }
      });
    } catch (e) {
      console.log(e);
    }

    // await firebase.firestore
    //   .collection("groups")
    //   .doc(groupIdString)
    //   .update({
    //     invitedUsers: FieldValue.arrayUnion(userIdString),
    //   });
  }

  async declineInvite(groupId) {
    const groupIdString = String(groupId);
    const userIdString = String(state.user.uid);
    try {
      await firebase.firestore
        .collection("groups")
        .doc(groupIdString)
        .update({
          invitedUsers: FieldValue.arrayRemove(userIdString),
        });

      await this.getInvitedUsers(groupIdString).then((users) => {
        if (users.length === 0) {
          this.makeGroupActive(groupIdString);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getInvitedUsers(groupIdString) {
    try {
      const groupSnapshot = await firebase.firestore
        .collection("groups")
        .doc(groupIdString)
        .get();

      const invitedUsers = groupSnapshot.data().invitedUsers;

      return Promise.resolve(invitedUsers);
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }
}
