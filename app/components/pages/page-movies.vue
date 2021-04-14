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
      movies: [],
      movieSnapshot: null
    };
  },

  methods: {
    goToMovie (movie) {
      this.$router.push({ name: 'movieShow', params: { movieId: movie.id }});
    }
  },

  beforeDestroy () {
    if (this.movieSnapshot) {
      this.movieSnapshot();
    }
  },

  mounted () {
    this.movieSnapshot = Movie.onSnapshot((querySnapshot) => {
      this.movies = querySnapshot.docs;
    }, (error) => {
      // TODO: Error handling
      console.error(error); // eslint-disable-line no-console
    });
  }
};
</script>
