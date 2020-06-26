import firebase from "nativescript-plugin-firebase";

import store from "~/store";
const state = store.state;

// collection.where()
// Firestore supports advanced querying with the where function.
// Those where clauses can be chained to form logical 'AND' queries:

// You can use the operators defined in firestore.WhereFilterOp,
// which are: '<' | '<=' | '==' | '>=' | '>' | 'in' | 'array-contains' | 'array-contains-an

export default class PromptService {
  async createPrompt(prompt) {
    const id = new Date().getTime();
    try {
      // Add a new document with a generated id.
      await firebase.firestore
        .collection("groups")
        .doc(state.selectedGroup.id)
        .update({
          activePrompts: firebase.firestore.FieldValue.arrayUnion({
            id: id,
            isResponding: true,
            isVoting: false,
            promptText: prompt.promptText,
          }),
        })
        .then((payload) => {
          const docId = String(id);
          store.dispatch("addPrompt", payload);
          firebase.firestore
            .collection("prompts")
            .doc(docId)
            .set({
              promptText: prompt.promptText,
              userImages: [],
            });
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getPromptImages(promptId) {
    const id = String(promptId);
    try {
      const promptSnapshot = await firebase.firestore
        .collection("prompts")
        .doc(id)
        .get();

      const imageArray = promptSnapshot.data().userImages;

      return Promise.resolve(imageArray);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addImage(downloadUrl, userId, docId) {
    try {
      const docIdString = String(docId);
      await firebase.firestore
        .collection("prompts")
        .doc(docIdString)
        .update({
          userImages: firebase.firestore.FieldValue.arrayUnion({
            userId: userId,
            imageUrl: downloadUrl,
          }),
        })
        .then((prompt) => {});
    } catch (error) {
      console.log(error);
    }
  }

  async userVoted() {}

  // Still needs work
  async groupResponded(userId, promptId) {
    try {
      const docIdString = String(promptId);
      await firebase.firestore
        .collection("groups")
        .doc(state.selectedGroup.id)
        .update({
          activePrompts: firebase.firestore.FieldValue.arrayUnion({
            isResponding: false,
            isVoting: true,
          }),
        });
    } catch (error) {
      console.log(error);
    }
  }

  async userResponded(userId, promptId) {
    try {
      const docIdString = String(promptId);
      await firebase.firestore
        .collection("prompts")
        .doc(docIdString)
        .update({
          usersResponded: firebase.firestore.FieldValue.arrayUnion(userId),
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPremadePrompts() {
    let prompts = [];
    try {
      const promptSnapshot = await firebase.firestore
        .collection("preparedPrompts")
        .get();
      promptSnapshot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        prompts.push(docData);
      });

      return Promise.resolve(prompts);
    } catch (error) {
      console.log(error);
    }
  }
}
