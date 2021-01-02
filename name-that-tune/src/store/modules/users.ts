import { usersRef } from "@/repositories/firebase.js";

const state = {
  records: []
};

const getters = {
  users: (state: any) => state.records,
};

const actions = {
  initStore: ({commit} : { commit: any}) => {
    usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      commit("SET_STORE", data);
    });
  }
};

const mutations = {
  SET_STORE(state, records) {
    state.records = records;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
