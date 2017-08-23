<template>
  <div class="page-movies">
    <card v-for="movie in movies" @click="openMovie(movie)" :title="movie.tmdbData.title" :key="movie.id" :imageSource="movie.posterUrl(500)" :imageText="movie.tmdbData.title"></card>
  </div>
</template>

<style src="style/components/pages/page-movies.scss"></style>

<script>
  import Movie from 'models/movie';
  import card from 'components/partials/card/card';
  import { shell } from 'electron';



  export default {
    components: {
      card
    },

    data () {
      return {
        movies: []
      };
    },

    mounted () {
      this.movies = Movie.findAll();
    },

    methods: {
      openMovie (movie) {
        shell.openExternal(movie.tmdbUrl);
      }
    }
  };
</script>
