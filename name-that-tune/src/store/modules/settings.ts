import { settingsRef } from "@/repositories/firebase.js";

const state = {
  customSettings: []
};

const getters = {
  settings: (state: any) => state.customSettings,
};

const actions = {
  loadSettings: ({commit} : { commit: any}) => {
    settingsRef.on('value', (snapshot) => {
      const data = snapshot.val();
      const session = localStorage.getItem("session");
      const uid = session ? JSON.parse(session).user.uid : null;
      commit("SET_SETTINGS", data[uid]);
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
