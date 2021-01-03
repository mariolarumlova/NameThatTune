import { db } from "@/repositories/firebase.js";

const state = {
  customSettings: []
};

const getters = {
  settings: (state: any) => state.customSettings,
};

const actions = {
  loadSettings: ({commit} : { commit: any}) => {
    const user = localStorage.getItem("user");
    const uid = user ? JSON.parse(user).uid : "";
    console.log(uid);
    db.ref("settings/" + uid).on('value', (snapshot) => {
      const data = snapshot.val();
      commit("SET_SETTINGS", data);
    });
  }
};

const mutations = {
  SET_SETTINGS(state, customSettings) {
    state.customSettings = customSettings;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
