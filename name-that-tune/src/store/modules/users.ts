import axios from "axios";

const state = {
  products: {},
  session: false
};

const getters = {
  products: (state: { products: any; }) => state.products,
  session: (state: { session: any; }) => state.session
};

const actions = {
  initStore: ({commit} : { commit: any}) => {
    axios.get("static/products.json").then(response => {
      console.log(response.data.products);
      commit("SET_STORE", response.data.products);
    });
  }
};

const mutations = {
  SET_STORE(state: { products: any; }, products: any) {
    state.products = products;
  },
  SET_SESSION(state: { session: any; }, session: any) {
    state.session = session;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
