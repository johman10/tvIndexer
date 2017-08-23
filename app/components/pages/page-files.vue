<template>
  <div class="page-files">
    <list-filter :options="filterOptions" @filter-change="applyFilter"></list-filter>
    <div class="page-files__list">
      <card @click="showFileInFolder(file)" v-for="file in files" :title="file.name" :sub-title="'#' + file.id" :info-lines="fileInfoLines(file)" :key="file.id" :imageText="getFileExtension(file)"></card>
    </div>
  </div>
</template>

<style src="style/components/pages/page-files.scss"></style>

<script>
  import File from 'models/file';
  import filterOptions from 'data/file/filter-options';
  import listFilter from 'components/partials/list-filter';
  import card from 'components/partials/card/card';
  import { shell } from 'electron';

  export default {
    components: {
      listFilter,
      card
    },

    data () {
      return {
        files: [],
        filterOptions
      };
    },

    mounted () {
      this.files = File.findAll();
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
      },

      showFileInFolder (file) {
        const filePath = file.dir + '/' + file.base;
        shell.showItemInFolder(filePath);
      },

      applyFilter (filterType) {
        switch (filterType) {
        case 'no-filter':
          this.files = File.findAll();
          break;
        case 'movie':
          this.files = File.findAll().filter(file => !!file.movie);
          break;
        case 'no-relation':
          this.files = File.where('movie', undefined);
          break;
        }
      }
    }
  };
</script>
