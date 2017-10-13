<template>
  <div class="page-movie-search">
    <input type="text" name="movie-search" v-model="searchQuery">
    <div class="page-movie-search__results">
      <card v-for="movie in searchResults" :key="movie.tmdbData.id" :title="movie.tmdbData.title" :imageSource="movie.posterUrl(500)" :imageText="movie.tmdbData.title" @click="updateRecord(movie)"></card>
    </div>
  </div>
</template>

<style src="style/components/pages/page-movie-search.scss"></style>

<script>
  import Movie from 'models/movie';
  import debounce from 'javascript-debounce';
  import tmdb from 'helpers/tmdb';

  import card from 'components/partials/card/card';

  export default {
    components: {
      card
    },

    props: {
      movieId: Number
    },

    data () {
      return {
        movie: {},
        searchQuery: '',
        searchResults: []
      };
    },

    methods: {
      async search () {
        const movieRecord = await tmdb.movie.search(this.searchQuery);
        const apiMovies = movieRecord.apiResponse.results;
        this.searchResults = apiMovies.map(apiMovie => new Movie({ tmdbData: apiMovie }));
      },

      updateRecord (movie) {
        this.movie.record.tmdbData = movie.record.tmdbData;
        this.movie.save();
        this.$router.push({ name: 'movieShow', props: { movieId: this.movie.id }});
      }
    },

    computed: {
      debouncedSearch () {
        return debounce(this.search.bind(this), 500);
      }
    },

    watch: {
      searchQuery () {
        this.debouncedSearch();
      }
    },

    created () {
      this.movie = Movie.find(this.movieId);
      this.searchQuery = this.movie.tmdbData.title;
    }
  };
</script>
