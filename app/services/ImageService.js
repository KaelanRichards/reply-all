import firebase from "nativescript-plugin-firebase";

import store from "~/store";
const state = store.state;

// collection.where()
// Firestore supports advanced querying with the where function.
// Those where clauses can be chained to form logical 'AND' queries:

// You can use the operators defined in firestore.WhereFilterOp,
// which are: '<' | '<=' | '==' | '>=' | '>' | 'in' | 'array-contains' | 'array-contains-an

export default class ImageService {
  getFilename(path) {
    let parts = path.split("/");
    return parts[parts.length - 1];
  }

  async uploadFile(localPath, file) {
    try {
      let filename = this.getFilename(localPath);
      let remotePath = `prompts/${filename}`;
      console.log("localPath ___ > ", localPath);
      console.log("REMOTEPATH ___ > ", remotePath);
      console.log("FILENAME ___ > ", filename);
      return await firebase.storage.uploadFile({
        remoteFullPath: remotePath,
        localFullPath: localPath,
        onProgress: function(status) {
          console.log("Uploaded fraction: " + status.fractionCompleted);
          console.log("Percentage complete: " + status.percentageCompleted);
        },
      });
    } catch (e) {}
  }

  async getDownloadUrl(remoteFilePath) {
    let remotePath = `prompts/${remoteFilePath}`;
    try {
      return await firebase.storage
        .getDownloadUrl({
          remoteFullPath: remotePath,
        })
        .then(
          (url) => {
            return url;
          },
          (errorMessage) => {
            console.log(errorMessage);
          }
        );
    } catch (e) {}
  }

  editGift(id, description, imagepath) {
    this.publishUpdates();
    return firebase
      .update("/Gifts/" + id + "", {
        description: description,
        imagepath: imagepath,
      })
      .then(
        function(result) {
          return "You have successfully edited this gift!";
        },
        function(errorMessage) {
          console.log(errorMessage);
        }
      );
  }
}
