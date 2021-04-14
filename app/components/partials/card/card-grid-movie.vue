<template>
  <div :class="['card-grid-movie', { 'card-grid-movie--empty': !showMovies }]">
    <state-list :loading="loading" empty-message="No movies to show." :empty="!movies.length" :show-list.sync="showMovies"></state-list>
    <template v-if="showMovies">
      <card v-for="movie in movies" :key="movie.id" :title="movie.title" :image-source="movie.posterUrl(500)" :image-text="movie.title" @click="$emit('click', movie)"></card>
    </template>
  </div>
</template>

<style src="style/components/partials/card/card-grid-movie.scss"></style>

<script>
import card from 'components/partials/card/card';
import stateList from 'components/partials/state/state-list';

export default {
  components: {
    card,
    stateList
  },

  props: {
    movies: Array,
    loading: Boolean,
  },

  data () {
    return {
      showMovies: false
    };
  }
};
</script>
