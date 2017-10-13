<template>
  <div class="app-navigation">
    <div class="app-navigation__header">Menu</div>
    <router-link :to="{ name: 'home' }" class="app-navigation__link">Home</router-link>
    <router-link :to="{ name: 'movieIndex' }" class="app-navigation__link">Movies</router-link>
    <router-link :to="{ name: 'fileIndex' }" class="app-navigation__link">Files</router-link>
  </div>
</template>

<style src="style/components/layout/app-navigation.scss"></style>
