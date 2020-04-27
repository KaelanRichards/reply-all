import BackendService from "./BackendService";
import firebase from "nativescript-plugin-firebase";
import { backendService } from "../main";

export default class UserService extends BackendService {
  async register(user) {
    // if you want to implement an email verification option
    //
    // return await firebase
    //   .createUser({
    //     email: user.email,
    //     password: user.password,
    //   })
    //   .then(function(response) {
    //     firebase.sendEmailVerification().then(
    //       function() {
    //         alert(
    //           "A verification email has been sent, click on the link to activate your account"
    //         );
    //       },
    //       function(error) {
    //         console.error("Error sending email verification: ", error);
    //       }
    //     );
    //   });
    const result = await firebase.createUser({
      email: user.email,
      password: user.password,
    });
    return JSON.stringify(result);
  }

  async login(user) {
    // return await firebase.login({
    //   type: firebase.LoginType.PASSWORD,
    //   passwordOptions: {
    //     email: user.email,
    //     password: user.password,
    //   },
    // });
    const result = await firebase.login({
      type: firebase.LoginType.PASSWORD,
      passwordOptions: {
        email: user.email,
        password: user.password,
      },
    });
    backendService.token = result.uid;
    return JSON.stringify(result);
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
