import VueRouter from 'vue-router';
import movieRoutes from 'config/router/movie-routes';
import fileRoutes from 'config/router/file-routes';
import searchRoutes from 'config/router/search-routes';
import fallbackRoutes from 'config/router/fallback-routes';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('components/pages/page-home')
  },
  ...movieRoutes,
  ...fileRoutes,
  ...searchRoutes,
  ...fallbackRoutes
];
export default new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes
});
