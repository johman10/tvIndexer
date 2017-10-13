<template>
  <div class="page-file">
    <h1>{{ file.name }}</h1>
    <button @click="showInFolder">Show in folder</button>
    <router-link :to="{ name: 'searchMovie', query: { q: file.name } }">
      <button>
        Manually match
      </button>
    </router-link>
    <button @click="removeFile">Remove</button>
    {{ file }}
  </div>
</template>

<style lang="css"></style>

<script>
  import File from 'models/file';
  import Movie from 'models/movie';
  import { shell } from 'electron';

  export default {
    props: {
      fileId: Number
    },

    data () {
      return {
        file: {}
      };
    },

    methods: {
      showInFolder () {
        shell.showItemInFolder(this.file.fullPath);
      },

      removeFile () {
        this.file.remove([{ class: Movie, type: 'hasOne' }]);
        this.$router.push({ name: 'fileIndex' });
      }
    },

    mounted () {
      this.file = File.find(this.fileId);
    }
  };
</script>
