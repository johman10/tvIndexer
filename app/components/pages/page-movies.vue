<template>
  <div>
    Movies
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import File from 'models/file';
  import Location from 'models/location';
  import tmdbHelper from 'helpers/tmdb';

  export default {
    mounted () {
      window.Movie = Movie;
      window.File = File;
      window.Location = Location;
      window.tmdbHelper = tmdbHelper;
      console.log(tmdbHelper); // eslint-disable-line no-console
      tmdbHelper.movie.search('Pirates').then((result) => {
        console.log(result); // eslint-disable-line no-console
      })
      .catch((error) => {
        console.error(error); // eslint-disable-line no-console
      });
    }
  };
</script>
