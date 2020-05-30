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
        })
        .then((prompt) => {
          store.dispatch("addPrompt", prompt);
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getRandomPrompts() {
    let prompts = [];
    try {
      const promptSnapshot = await firebase.firestore
        .collection("prompts")
        .get();
      promptSnapshot.forEach((doc) => {
        let docData = doc.data();
        docData.id = doc.id;
        console.log("this the doc", docData);
        prompts.push(docData);
      });

      console.log("this is the prompts", prompts);
      return Promise.resolve(prompts);
    } catch (error) {
      console.log(error);
    }
  }
}
