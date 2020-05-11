import BackendService from "./BackendService";
import firebase from "nativescript-plugin-firebase";
import { backendService } from "../main";

export default class UserService extends BackendService {
  async register(user) {
    // create authentication for user
    const createdUser = await firebase.createUser({
      email: user.email,
      password: user.password,
    });

    // create user document in firestore
    await firebase.firestore.set("users", createdUser.uid, {
      // admin: false,
      email: user.email,
      userId: createdUser.uid,
      // fill these so the orderBy filter of the player dropdown works (it doesn't like undefined values)
    });

    const userDoc = await firebase.firestore.getDocument(
      "users",
      createdUser.uid
    );

    const fireStoreUser = userDoc.data();
    fireStoreUser.ref = userDoc.ref;
    fireStoreUser.id = createdUser.uid;
    return fireStoreUser;
  }

  async login(user) {
    // return await firebase.login({
    //   type: firebase.LoginType.PASSWORD,
    //   passwordOptions: {
    //     email: user.email,
    //     password: user.password,
    //   },
    // });
    const loggedInUser = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password,
      },
    });
    backendService.token = loggedInUser.uid;
    return JSON.stringify(loggedInUser);
  }

  async loginFacebook(user) {
    await firebase
      .login({
        type: firebase.LoginType.FACEBOOK,
        facebookOptions: {
          // full list: https://developers.facebook.com/docs/facebook-login/permissions/
          scope: ["public_profile", "email"], // optional: defaults to ['public_profile', 'email']
        },
      })
      .then((result) => {
        //console.log("Returned from firebase with result");
        //console.dir(result);
        return Promise.resolve(JSON.stringify(result));
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  async resetPassword(email) {
    return await firebase.resetPassword({
      email: email,
    });
  }

  async logout() {
    backendService.token = "";
    return firebase.logout();
  }
}
