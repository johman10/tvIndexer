<template>
  <div class="app-layout">
    <app-header>TV Indexer</app-header>
    <app-navigation></app-navigation>
    <router-view class="app-content"></router-view>
  </div>
</template>

<style src="style/components/layout/app-layout.scss"></style>

<script>
  import appHeader from 'components/layout/app-header';
  import appNavigation from 'components/layout/app-navigation';

  export default {
    components: {
      appHeader,
      appNavigation
    }
  };
</script>
