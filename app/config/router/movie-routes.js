export default [
  {
    path: '/movies',
    name: 'movieIndex',
    component: () => import('components/pages/page-movies')
  },

  {
    path: '/movies/:movieId',
    name: 'movieShow',
    component: () => import('components/pages/page-movie'),
    props: route => ({
      movieId: Number(route.params.movieId)
    })
  }
];
