export default [
  {
    path: '/search',
    name: 'searchMovie',
    component: () => import('components/pages/page-search-movie'),
    props: route => ({
      query: route.query.q,
      movieId: route.query.movieId ? Number(route.query.movieId) : undefined,
      fileId: route.query.fileId ? Number(route.query.fileId) : undefined
    })
  }
];
