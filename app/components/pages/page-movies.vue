<template>
  <div>
    Movies
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import tmdbHelper from 'helpers/tmdb-helper';

  export default {
    mounted () {
      window.Movie = Movie;
      window.tmdbHelper = tmdbHelper;
      // movie.searchFirst('Pirates').then((result) => {
      //   console.log(result); // eslint-disable-line no-console
      // })
      // .catch((error) => {
      //   console.error(error); // eslint-disable-line no-console
      // });
    }
  };
</script>
