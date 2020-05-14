import Vue from "nativescript-vue";
import VueDevtools from "nativescript-vue-devtools";
import firebase from "nativescript-plugin-firebase";

import routes from "./router";
import store from "./store";

import BackendService from "./services/BackendService";
import UserService from "./services/UserService";

import RadDataForm from "nativescript-ui-dataform/vue";
import RadAutoComplete from "nativescript-ui-autocomplete/vue";
import GroupService from "./services/GroupService";

export const backendService = new BackendService();
export const userService = new UserService();
export const groupService = new GroupService();

Vue.use(RadAutoComplete);
Vue.use(RadDataForm);
Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

Vue.prototype.$store = store;
Vue.prototype.$userService = userService;
Vue.prototype.$groupService = groupService;
// Vue.prototype.$changeRoute = (to, options) => {
//   Vue.navigateTo(routes[to], options);
// };

if (TNS_ENV !== "production") {
  Vue.use(VueDevtools);
}

Vue.config.silent = false;

// global configure default loader animation options
global.loaderOptions = {
  android: {
    margin: 100,
    dimBackground: true,
    color: "#4B9ED6",
    hideBezel: true,
    mode: 3,
  },
  ios: {
    dimBackground: true,
    color: "#FFFFFF",
    hideBezel: true,
    mode: 3,
  },
};

firebase
  .init({
    // Listens for authentication state changes
    // onAuthStateChanged: (user) => {
    //   // optional
    //   console.log(
    //     (user.loggedIn ? "Logged in to firebase" : "Logged out from firebase") +
    //       " (init's onAuthStateChanged callback)"
    //   );
    //   if (user.loggedIn) {
    //     backendService.token = user.user.uid;
    //     console.log(user.user.uid);
    //     store.commit("setUser", user.user);
    //     // Vue.navigateTo(routes.home, { clearHistory: true });
    //   } else {
    //     backendService.token = "";
    //     // Vue.navigateTo(routes.login, { clearHistory: true });
    //   }
    // },
  })
  .then(
    (instance) => {
      console.log("firebase.init done");
    },
    (error) => {
      console.log(`firebase.init error: ${error}`);
    }
  );

new Vue({
  store,
  render(h) {
    return h("frame", [
      h(routes.login),
      // when you get auth firgured out
      // h(backendService.isLoggedIn() ? routes.home : routes.login),
    ]);
  },
}).$start();
