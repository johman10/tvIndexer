import Vue from 'vue';
Vue.config.devtools = false;
Vue.config.productionTip = false;

// require all test files (files that ends with .spec.js)
const testsContext = require.context('.', true, /\.spec.js$/);
testsContext.keys().forEach(testsContext);
