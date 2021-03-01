import Vue from "vue";
import Vuex from "vuex";
import { setStore, getStore } from "@/config/utils";

Vue.use(Vuex);

const session = getStore("session");
const user = getStore("user");

export default new Vuex.Store({
  state: {
    session: session,
    uid: user ? user.uid : false
  },
  mutations: {
    SET_SESSION(state, session) {
      setStore("session", session);
      setStore("user", { uid: session && session.user ? session.user.uid : false});
      state.session = session;
      state.uid = session && session.user ? session.user.uid : false;
    }
  },
  actions: {},
  getters: {
    session: (state: { session: any; }) => state.session,
    uid: (state: { uid: any; }) => state.uid
  }
});
