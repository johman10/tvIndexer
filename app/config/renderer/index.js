import Vue from 'vue';
import VueRouter from 'vue-router';

import appLayout from 'components/layout/app-layout';
import router from 'config/router/index';

import 'style/styles.scss';

Vue.use(VueRouter);

if (process.env.NODE_ENV === 'development') {
  Vue.config.debug = true;
}

new Vue({
  router,
  ...appLayout
}).$mount('#app');
