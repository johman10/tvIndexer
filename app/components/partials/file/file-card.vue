<template>
  <div class="file-card" @click="openFolder">
    <div class="file-card__image">
      {{ fileType }}
    </div>
    <div class="file-card__title">
      {{ file.name }}
      <span class="file-card__sub-title">#{{ file.id }}</span>
    </div>
    <div class="file-card__info">
      <div class="file-card__folder">
        <span class="file-card__info-title">Folder: </span>
        {{ file.dir }}
      </div>
    </div>
  </div>
</template>

<style src="style/components/partials/file/file-card.scss"></style>

<script>
  import { shell } from 'electron';

  export default {
    props: {
      file: {
        type: Object,
        default: {}
      }
    },

    computed: {
      fileType () {
        return this.file.ext.split('.').join('');
      },
      filePath () {
        return this.file.dir + '/' + this.file.base;
      }
    },

    methods: {
      openFolder () {
        shell.showItemInFolder(this.filePath);
      }
    }
  };
</script>
