import Vue from "nativescript-vue";
import Vuex from "vuex";
import firebase from "nativescript-plugin-firebase";

Vue.use(Vuex);

const state = {
  user: {
    userId: "",
    userEmail: "",
    // groups: [
    //   {
    //     groupName: "",
    //     userCount: "",
    //     prompts: [{ promptStatus: "" }],
    //   },
    // ],
    pendingGroupInvites: [],
  },
  groups: {
    groupName: "",
    groupUsers: [
      {
        userId: "",
        userName: "",
        promptsWon: "",
      },
    ],
    // need to be able to scale this better so split out into a seperate collection
    activePrompts: {
      promptStatus: "",
      promptText: "",
      PromptTimeRemaing: "",
      promptWinner: {
        userId: "",
        imageUrl: "",
      },
    },
  },
  // prompts that have been completed will be added here
  Results: {
    prompt: {
      promptText: "",
      promptWinner: {
        userId: "",
        imageUrl: "",
      },
    },
  },
  promptVote: {
    promptText: "",
    promptResponses: [
      {
        userId: "",
        userName: "",
        imageUrl: "",
        votes: "",
      },
    ],
  },
  selectedGroup: {
    groupName: "",
  },
};

const getters = {};

const mutations = {
  setUser: (state, user) => {
    state.user = user;
  },
  setGroups: (state, groups) => {
    state.groups = groups;
  },
  setSelectedGroup: (state, group) => {
    state.selectedGroup = group;
  },
};

const actions = {
  setUser({ commit }, user) {
    commit("setUser", user);
  },
  setSelectedGroup({ commit }, group) {
    commit("setSelectedGroup", group);
  },
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
  fetchGroups: ({ state, commit }) => {
    firebase
      .database()
      .ref("groups")
      .orderByChild("userId")
      .equalTo(state.user.uid)
      .once("value", function(data) {
        const obj = data.val();
        const groups = Object.keys(obj || {}).map((key) => ({
          id: key,
          ClassName: obj[key].ClassName,
          groupName: obj[key].groupName,
          groupUsers: obj[key].groupUsers,
          prompts: obj[key].prompts,
        }));
        commit("setGroups", groups);
      });
  },
};

const userStore = {
  state,
  getters,
  mutations,
  actions,
};

export default new Vuex.Store(userStore);
