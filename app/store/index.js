import Vue from "nativescript-vue";
import Vuex from "vuex";
import firebase from "nativescript-plugin-firebase";

Vue.use(Vuex);

const state = {
  user: null,
};

const getters = {};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
};

const actions = {
  fetchCurrentUser({ commit }) {
    firebase.getCurrentUser().then(
      function(user) {
        commit("setUser", user);
      },
      function(errorMessage) {
        console.log(errorMessage);
      }
    );
  },
};

const userStore = {
  state,
  getters,
  mutations,
  actions,
};

export default new Vuex.Store(userStore);
