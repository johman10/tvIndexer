<template>
  <div>
    Movies
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import File from 'models/file';
  import tmdbApiHelper from 'helpers/tmdb/api-helper';

  export default {
    mounted () {
      window.Movie = Movie;
      window.File = File;
      window.tmdbApiHelper = tmdbApiHelper;
      // movie.searchFirst('Pirates').then((result) => {
      //   console.log(result); // eslint-disable-line no-console
      // })
      // .catch((error) => {
      //   console.error(error); // eslint-disable-line no-console
      // });
    }
  };
</script>
