import VueRouter from 'vue-router';
import movieRoutes from 'config/router/movie-routes';
import fallbackRoutes from 'config/router/fallback-routes';

const routes = [
  {
    path: '/',
    name: 'home',
    component: require('components/pages/page-home')
  },
  ...movieRoutes,
  ...fallbackRoutes
];

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});
