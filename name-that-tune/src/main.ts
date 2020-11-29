import Vue from 'vue';
import App from './App.vue';
import router from './router/router';
import store from '@/store/store';

import '@/assets/css/style.css';
import './registerServiceWorker';

/* eslint-disable */
const GoogleAuth = require('./config/google_oAuth.js');
/* eslint-disable */
const GSignInButton = require('vue-google-signin-button');

const gauthOption = {
  clientId: '633325488746-sn9qq8n380lf97b2cnpe42vh6jb4emn2.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
};
Vue.use(GoogleAuth.installGoogleAuthPlugin, gauthOption);
Vue.use(GSignInButton);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');