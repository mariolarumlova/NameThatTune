import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from '@/store/store';

import '@/assets/css/style.css';
import './registerServiceWorker';

import * as GoogleAuth from './config/google_oAuth.js';

const gauthOption = {
  clientId: '532948244784-8suas2a71nbjdrvl6hrr7o3o37spbpg5.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
};
Vue.use(GoogleAuth.installGoogleAuthPlugin, gauthOption);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');