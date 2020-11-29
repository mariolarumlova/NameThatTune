import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "@/store/store";

import "@/assets/css/style.css";
import "./registerServiceWorker";

/* eslint-disable */
const GSignInButton = require('vue-google-signin-button');

Vue.use(GSignInButton);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');