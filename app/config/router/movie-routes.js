export default [
  {
    path: '/movies',
    name: 'movieIndex',
    component: () => import('components/pages/page-movies')
  },

  {
    path: '/movies/:id',
    name: 'movieShow',
    component: () => import('components/pages/page-movie'),
    props: route => ({
      movieId: Number(route.params.id)
    })
  },

  {
    path: '/movies/:id/search',
    name: 'movieSearch',
    component: () => import('components/pages/page-movie-search'),
    props: route => ({
      movieId: Number(route.params.id)
    })
  }
];
