import VueRouter from 'vue-router';
import movieRoutes from 'config/router/movie-routes';
import fileRoutes from 'config/router/file-routes';
import fallbackRoutes from 'config/router/fallback-routes';

const routes = [
  {
    path: '/',
    name: 'home',
    component: require('components/pages/page-home')
  },
  ...movieRoutes,
  ...fileRoutes,
  ...fallbackRoutes
];

export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});
