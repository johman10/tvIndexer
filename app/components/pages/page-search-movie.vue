<template>
  <div class="page-search-movie">
    <input type="text" name="search-movie" v-model="searchQuery">
    <card-grid-movie :loading="loading" :movies="searchResults" @click="saveRecord"></card-grid-movie>
  </div>
</template>

<script>
import Movie from 'models/movie';
import File from 'models/file';
import debounce from 'javascript-debounce';
// import tmdb from 'helpers/tmdb';

import cardGridMovie from 'components/partials/card/card-grid-movie';

export default {
  components: {
    cardGridMovie
  },

  props: {
    query: String,
    movieId: Number,
    fileId: Number
  },

  data () {
    return {
      movie: {},
      file: {},
      loading: false,
      searchQuery: this.query,
      searchResults: []
    };
  },

  methods: {
    async search () {
      console.error('Not implemented (again) yet'); // eslint-disable-line no-console
      // if (!this.searchQuery) {
      //   this.loading = false;
      //   return;
      // }
      //
      // const movieRecord = await tmdb.movie.search(this.searchQuery);
      // const apiMovies = movieRecord.apiResponse.results;
      // this.searchResults = apiMovies.map(apiMovie => new Movie({ tmdbData: apiMovie }));
      // this.loading = false;
    },

    saveRecord (movie) {
      const existingMovie = Movie.findBy('tmdbData.title', movie.record.tmdbData.title);
      if (this.movieId) {
        const perviousMovie = this.movie;
        if (existingMovie) {
          this.movie = existingMovie;
        }
        this.movie.record.tmdbData = movie.record.tmdbData;
        this.movie.save();
        const movieFiles = perviousMovie.getRelation('belongsToMany', File);
        movieFiles.map((movieFile) => {
          movieFile.record.movie = this.movie.id;
          movieFile.save();
        });
        perviousMovie.remove();
      } else if (this.fileId) {
        this.movie = existingMovie;
        if (!this.movie) {
          this.movie = movie.save();
        }
        this.file.record.movie = this.movie.id;
        this.file.save();
      }
      this.$router.push({ name: 'movieShow', params: { movieId: this.movie.id }});
    }
  },

  computed: {
    debouncedSearch () {
      return debounce(this.search.bind(this), 500);
    }
  },

  watch: {
    searchQuery () {
      this.loading = true;
      this.debouncedSearch();
    }
  },

  created () {
    this.loading = true;
    if (this.movieId) {
      this.movie = Movie.find(this.movieId);
    } else if (this.fileId) {
      this.file = File.find(this.fileId);
    }
    this.search();
  }
};
</script>
