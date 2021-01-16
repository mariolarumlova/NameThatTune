import { usersRef } from "@/repositories/firebase.js";

const state = {
  records: []
};

const getters = {
  users: (state: any) => state.records,
};

const actions = {
  loadUsers: ({commit} : { commit: any}) => {
    usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      commit("SET_USERS", data);
    });
  }
};

const mutations = {
  SET_USERS(state, records) {
    state.records = records;
  },
};

export default {
  state,
  getters,
  actions,
  mutations
};
