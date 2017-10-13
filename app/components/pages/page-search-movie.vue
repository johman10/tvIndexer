<template>
  <div class="page-search-movie">
    <input type="text" name="search-movie" v-model="searchQuery">
    <card-grid-movie :movies="searchResults" @click="saveRecord"></card-grid-movie>
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import debounce from 'javascript-debounce';
  import tmdb from 'helpers/tmdb';

  import cardGridMovie from 'components/partials/card/card-grid-movie';

  export default {
    components: {
      cardGridMovie
    },

    props: {
      query: String,
      movieId: Number
    },

    data () {
      return {
        movie: {},
        searchQuery: this.query,
        searchResults: []
      };
    },

    methods: {
      async search () {
        if (!this.searchQuery) return;

        const movieRecord = await tmdb.movie.search(this.searchQuery);
        const apiMovies = movieRecord.apiResponse.results;
        this.searchResults = apiMovies.map(apiMovie => new Movie({ tmdbData: apiMovie }));
      },

      saveRecord (movie) {
        this.movie.record.tmdbData = movie.record.tmdbData;
        this.movie.save();
        if (this.movie.id) {
          // Save succesfull, new record was created
          this.$router.push({ name: 'movieShow', params: { movieId: this.movie.id }});
        } else {
          const existingMovie = Movie.findBy('tmdbData.title', movie.tmdbData.title);
          this.$router.push({ name: 'movieShow', params: { movieId: existingMovie.id }});
        }
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
      if (this.movieId) {
        this.movie = Movie.find(this.movieId);
        this.search();
      } else {
        this.movie = new Movie();
      }
    }
  };
</script>
