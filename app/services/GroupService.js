import firebase from "nativescript-plugin-firebase";

import store from '~/store';
const user = store.state.user;

export default class GroupService {
  async getGroups() {
    const groupsCollection = await firebase.firestore().collection("groups");
    return Promise.resolve(JSON.stringify(groupsCollection));
  }
}
