<template>
  <div class="app-layout">
    <app-navigation></app-navigation>
    <router-view class="app-content"></router-view>
  </div>
</template>

<style src="style/components/layout/app-layout.scss"></style>

<script>
import appNavigation from 'components/layout/app-navigation';

export default {
  components: {
    appNavigation
  }
};
</script>
