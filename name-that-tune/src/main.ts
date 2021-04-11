import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "@/store/store";

import "@/assets/css/style.css";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";

import firebase from "firebase";
import "@/repositories/firebase";
import { firestorePlugin }  from "vuefire";
import VueYoutube from 'vue-youtube';
 
Vue.use(VueYoutube);
Vue.use(firestorePlugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
