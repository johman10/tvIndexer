<template>
  <div class="card-grid-movie">
    <card v-for="movie in movies" :key="movie.tmdbData.id" :title="movie.tmdbData.title" :imageSource="movie.posterUrl(500)" :imageText="movie.tmdbData.title" @click="$emit('click', movie)"></card>
  </div>
</template>

<style src="style/components/partials/card/card-grid-movie.scss"></style>

<script>
  import card from 'components/partials/card/card';

  export default {
    components: {
      card
    },

    props: {
      movies: Array
    }
  };
</script>
