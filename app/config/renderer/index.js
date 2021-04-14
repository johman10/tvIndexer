import Vue from 'vue';
import VueRouter from 'vue-router';
import VueFire from 'vuefire';
import { fAuth } from 'config/renderer/firebase';
import globalMixin from 'mixins/global';
import 'style/styles.scss';

import appLayout from 'components/layout/app-layout';
import router from 'config/router';

import menuConfig from 'config/menu';
menuConfig();

Vue.use(VueRouter);
Vue.use(VueFire);
Vue.mixin(globalMixin);

if (process.env.NODE_ENV === 'development') {
  Vue.config.debug = true;
}

new Vue({
  router,
  ...appLayout,
  mounted () {
    fAuth.signInAnonymously().catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // TODO: Better error handling
      console.error(errorCode, errorMessage); // eslint-disable-line no-console
    });

    fAuth.onAuthStateChanged(user => {
      this.$currentUserId = user ? user.uid : null;
    });
  }
}).$mount('#app');
