<template>
  <div class="page-movie" v-if="movie.tmdbData">
    <h1>{{ movie.tmdbData.title }}</h1>
    <button @click="openInfo">More info</button>
    <router-link :to="{ name: 'searchMovie', query: { q: movie.tmdbData.title, movieId: movie.id } }">
      <button>
        Manually match
      </button>
    </router-link>
    <button @click="removeMovie">
      Remove
    </button>

    <h2>Plot</h2>
    <p>{{ movie.tmdbData.overview }}</p>

    <h2>Files</h2>
    <button v-for="file in files" @click="openFile(file.fullPath)">{{ file.name }}</button>
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import File from 'models/file';
  import { shell } from 'electron';

  export default {
    props: {
      movieId: Number
    },

    data () {
      return {
        movie: {},
        files: []
      };
    },

    mounted () {
      this.movie = Movie.find(this.movieId);
      this.files = this.movie.getRelation('belongsToMany', File);
    },

    methods: {
      openFile (fullPath) {
        shell.openItem(fullPath);
      },

      removeMovie () {
        this.movie.remove([{ class: File, type: 'belongsTo' }]);
        this.$router.push({ name: 'movieIndex' });
      },

      openInfo () {
        shell.openExternal(this.movie.tmdbUrl);
      }
    }
  };
</script>
