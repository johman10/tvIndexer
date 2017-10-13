<template>
  <div class="card-grid-file">
    <card @click="$emit('click', file)" v-for="file in files" :title="file.name" :sub-title="'#' + file.id" :info-lines="fileInfoLines(file)" :key="file.id" :imageText="getFileExtension(file)"></card>
  </div>
</template>

<style src="style/components/partials/card/card-grid-file.scss"></style>

<script>
  import card from 'components/partials/card/card';

  export default {
    components: {
      card
    },

    props: {
      files: Array
    },

    methods: {
      fileInfoLines (file) {
        return [{
          title: 'Folder',
          data: file.dir
        }];
      },

      getFileExtension (file) {
        return file.ext.split('.').join('');
      }
    }
  };
</script>
