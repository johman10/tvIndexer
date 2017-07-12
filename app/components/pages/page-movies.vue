<template>
  <div>
    Movies

    <a href="#" @click.prevent="moviesSync">Sync</a>

    <ol>
      <li v-for="movie in movies">
        <template v-if="movie.tmdbData && movie.tmdbData.title">
          {{ movie.record.tmdbData.title }}
        </template>
        <template v-else>
          {{ movie }},
          {{ movie.getRelation('belongsTo', 'file') }}
        </template>
      </li>
    </ol>
  </div>
</template>

<script>
  import Movie from 'models/movie';
  import File from 'models/file';
  import Location from 'models/location';
  import tmdbHelper from 'helpers/tmdb';
  import { search, findFileInfo } from 'helpers/filesystem-helper';

  const MOVIES_DIRECTORY = '/Volumes/Movies/';

  export default {
    data () {
      return {
        movies: []
      };
    },

    methods: {
      moviesSync () {
        const filePaths = search(MOVIES_DIRECTORY, /\(.avi|.mkv|.mp4\)$/);
        // TODO: code improve this
        const fileRecords = filePaths.map(filePath => new File(findFileInfo(filePath, true)));
        const moviePromises = fileRecords.map(fileRecord => fileRecord.buildMovie());
        Promise.all(moviePromises)
          .then((movieRecords) => {
            movieRecords.forEach((movieRecord, index) => {
              movieRecord = movieRecord.saveFirstResult();
              fileRecords[index].record.movie = movieRecord.id;
            });
            fileRecords.map(fileRecord => fileRecord.save());
            this.movies = movieRecords;
          })
          .catch((error) => {
            // TODO: better errorHandling
            throw error;
          });
      }
    },
    mounted () {
      this.movies = Movie.findAll();

      window.Movie = Movie;
      window.File = File;
      window.Location = Location;
      window.tmdbHelper = tmdbHelper;
      // console.log(tmdbHelper); // eslint-disable-line no-console
      // tmdbHelper.movie.search('Pirates')
      //   .then((result) => {
      //     console.log(result); // eslint-disable-line no-console
      //   })
      //   .catch((error) => {
      //     console.error(error); // eslint-disable-line no-console
      //   });
    }
  };
</script>
