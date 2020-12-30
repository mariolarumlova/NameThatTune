import { usersRef } from "@/repositories/firebase.js";

const state = {
  users: {},
  session: false
};

const getters = {
  users: (state: { users: any; }) => state.users,
  session: (state: { session: any; }) => state.session
};

const actions = {
  initStore: ({commit} : { commit: any}) => {
    usersRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(data);
      commit("SET_STORE", data);
    });
  }
};

const mutations = {
  SET_STORE(state, users) {
    state.users = users;
  },
  SET_SESSION(state, session) {
    state.session = session;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
