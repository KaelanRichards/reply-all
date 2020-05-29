import firebase from "nativescript-plugin-firebase";

export default class SearchService {
  //had to create  composite index in firestore
  async searchByName(search = "", limit = 25, lastNameOfLastPerson = "") {
    let searchResults = [];

    try {
      const snapshot = await firebase.firestore
        .collection("users")
        .where("keywords", "array-contains", search.toLowerCase())
        .orderBy("name.lastName")
        .limit(limit)
        .get();
      console.log("SNAPSHOT", snapshot);
      if (snapshot) {
        snapshot.forEach((doc) => searchResults.push(doc.data()));
        console.log("ARRAY", searchResults);

        return searchResults;
      }
    } catch (error) {
      console.log(error);
    }
  }
}
