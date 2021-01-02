import Vue from "vue";
import Vuex from "vuex";
import { setStore, getStore } from "@/config/utils";
import users from "@/store/modules/users";

Vue.use(Vuex);

const session = getStore("session");
const user = getStore("user");

export default new Vuex.Store({
  state: {
    session: session
  },
  mutations: {
    SET_SESSION(state, session) {
      setStore("session", session);
      state.session = session;
    }
  },
  actions: {},
  getters: {
    session: (state: { session: any; }) => state.session
  },
  modules: {
    users
  }
});
