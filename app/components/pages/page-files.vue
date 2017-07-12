<template>
  <div>
    <list-filter :options="filterOptions" @filter-change="applyFilter"></list-filter>
    <file-card v-for="file in files" :file="file" :key="file.id"></file-card>
  </div>
</template>

<script>
  import File from 'models/file';
  import filterOptions from 'data/file/filter-options';
  import listFilter from 'components/partials/list-filter';
  import fileCard from 'components/partials/file/file-card';

  export default {
    components: {
      listFilter,
      fileCard
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
