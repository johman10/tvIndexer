export default [
  {
    path: '/search',
    name: 'searchMovie',
    component: () => import('components/pages/page-search-movie'),
    props: route => ({
      query: route.query.q,
      movieId: route.query.movieId
    })
  }
];
