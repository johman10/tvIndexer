import Vue from 'vue';
import VueRouter from 'vue-router';
import 'style/styles.scss';

import appLayout from 'components/layout/app-layout';
import router from 'config/router';

import menuConfig from 'config/menu';
console.log(menuConfig); // eslint-disable-line no-console
menuConfig();
Vue.use(VueRouter);

if (process.env.NODE_ENV === 'development') {
  Vue.config.debug = true;
}

new Vue({
  router,
  ...appLayout
}).$mount('#app');
