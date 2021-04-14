<template>
  <div class="page-files">
    <list-filter class="page-files__filters" :options="filterOptions" @filter-change="applyFilter"></list-filter>
    <card-grid-file class="page-files__list" @click="goToFile" :files="files"></card-grid-file>
  </div>
</template>

<style src="style/components/pages/page-files.scss"></style>

<script>
import File from 'models/file';
import filterOptions from 'data/file/filter-options';
import listFilter from 'components/partials/list-filter';
import cardGridFile from 'components/partials/card/card-grid-file';

export default {
  components: {
    listFilter,
    cardGridFile
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
    goToFile (file) {
      this.$router.push({ name: 'fileShow', params: { fileId: file.id }});
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
