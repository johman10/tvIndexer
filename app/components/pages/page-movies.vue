<template>
  <div class="page-movies">
    <card-grid-movie :movies="movies" @click="goToMovie"></card-grid-movie>
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import cardGridMovie from 'components/partials/card/card-grid-movie';

  export default {
    components: {
      cardGridMovie
    },

    data () {
      return {
        movies: []
      };
    },

    methods: {
      goToMovie (movie) {
        this.$router.push({ name: 'movieShow', params: { movieId: movie.id }});
      }
    },

    mounted () {
      this.movies = Movie.findAll();
    }
  };
</script>
