<template>
  <div class="page-movies">
    <router-link v-for="movie in movies" :key="movie.id" :to="{ name: 'movieShow', params: { id: movie.id }}">
      <card :title="movie.tmdbData.title" :imageSource="movie.posterUrl(500)" :imageText="movie.tmdbData.title"></card>
    </router-link>
  </div>
</template>

<style src="style/components/pages/page-movies.scss"></style>

<script>
  import Movie from 'models/movie';
  import card from 'components/partials/card/card';

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
    }
  };
</script>
