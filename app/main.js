import Vue from "nativescript-vue";
import VueDevtools from "nativescript-vue-devtools";
// import App from './components/App'
import firebase from "nativescript-plugin-firebase";

import routes from "./router";
import store from "./store";

import BackendService from "./services/BackendService";
import UserService from "./services/UserService";

import RadDataForm from "nativescript-ui-dataform/vue";
import RadAutoComplete from "nativescript-ui-autocomplete/vue";

export const backendService = new BackendService();
export const userService = new UserService();

Vue.use(RadAutoComplete);
Vue.use(RadDataForm);

Vue.prototype.$store = store;
Vue.prototype.$userService = userService;
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

Vue.registerElement(
  "CardView",
  () => require("@nstudio/nativescript-cardview").CardView
);

firebase
  .init({
    // This is to get authentication crackalackin
    //
    // onAuthStateChanged: (data) => {
    //   // optional
    //   console.log(
    //     (data.loggedIn ? "Logged in to firebase" : "Logged out from firebase") +
    //       " (init's onAuthStateChanged callback)"
    //   );
    //   if (data.loggedIn) {
    //     backendService.token = data.user.uid;
    //     console.log(data.user.uid);
    //     store.commit("setUser", data.user);
    //     Vue.navigateTo(routes.home, { clearHistory: true });
    //   } else {
    //     backendService.token = "";
    //     Vue.navigateTo(routes.login, { clearHistory: true });
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
