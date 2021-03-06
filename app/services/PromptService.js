import firebase from "nativescript-plugin-firebase";

import store from "~/store";
const state = store.state;

// collection.where()
// Firestore supports advanced querying with the where function.
// Those where clauses can be chained to form logical 'AND' queries:

// You can use the operators defined in firestore.WhereFilterOp,
// which are: '<' | '<=' | '==' | '>=' | '>' | 'in' | 'array-contains' | 'array-contains-an

export default class PromptService {
  async createPrompt(prompt, groupId = "") {
    const id = new Date().getTime();

    // depending on where this gets called it will be passed a groupId
    if (groupId === "") {
      groupId = state.selectedGroup.id;
    }
    try {
      // Add a new document with a generated id.
      await firebase.firestore
        .collection("groups")
        .doc(groupId)
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

  async userVoted(userId, promptId, votedFor) {
    const docIdString = String(promptId);
    await firebase.firestore
      .collection("prompts")
      .doc(docIdString)
      .update({
        usersVoted: firebase.firestore.FieldValue.arrayUnion(userId),
      });

    const promptReference = await firebase.firestore
      .collection("prompts")
      .doc(docIdString);

    const promptSnapshot = await firebase.firestore
      .collection("prompts")
      .doc(docIdString)
      .get();

    const promptDocData = promptSnapshot.data();
    if (!promptDocData) {
      console.log("City SF doesn't exist");
    } else {
      if (!promptDocData.voteSubmission) {
        await firebase.firestore.set(
          "prompts",
          docIdString,
          {
            voteSubmission: [
              {
                userVoted: userId,
                votedFor: votedFor,
              },
            ],
          },
          { merge: true }
        );
      } else {
        let submissions = promptDocData.voteSubmission;
        submissions.push({
          userVoted: userId,
          votedFor: votedFor,
        });

        await firebase.firestore
          .collection("prompts")
          .doc(docIdString)
          .update({
            voteSubmission: submissions,
          });
      }
    }

    // // create user document in firestores
    // await firebase.firestore
    //   .collection("prompt")
    //   .doc(docIdString)
    //   .set(
    //     {
    //       voteSubmission: {
    //         userVoted: userId,
    //         votedFor: votedFor,
    //       },
    //     },
    //     { merge: true }
    //   );

    const usersResponded = promptSnapshot.data().usersVoted;

    return usersResponded;
  }

  async groupResponded(promptId) {
    try {
      const docIdString = String(promptId);
      const groupSnapshot = await firebase.firestore
        .collection("groups")
        .doc(state.selectedGroup.id)
        .get();

      let prompts = groupSnapshot.data().activePrompts;

      const promptIndex = prompts.findIndex((prompt) => prompt.id == promptId);

      prompts[promptIndex].isResponding = false;
      prompts[promptIndex].isVoting = true;

      // firebase does not support updating specific elements in array so
      // workaround is to read array from db, update element on client,
      // and replace array in firebase with new updated array
      await firebase.firestore
        .collection("groups")
        .doc(state.selectedGroup.id)
        .update({
          activePrompts: prompts,
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

      const promptSnapshot = await firebase.firestore
        .collection("prompts")
        .doc(docIdString)
        .get();

      const usersResponded = promptSnapshot.data().usersResponded;

      return Promise.resolve(usersResponded);
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
