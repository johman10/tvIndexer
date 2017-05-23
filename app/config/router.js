import VueRouter from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: require('components/pages/page-home')
  },
  {
    path: '/movies',
    name: 'movies',
    component: require('components/pages/page-movies')
  },
  {
    path: '*',
    redirect: '/'
  }
];

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});
