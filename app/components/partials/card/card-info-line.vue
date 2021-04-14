<template>
  <div class="card-info-line">
    <span class="card-info-line__title">{{ title }}:</span> {{ value }}
  </div>
</template>

<style src="style/components/partials/card/card-info-line.scss"></style>

<script>
export default {
  props: {
    title: String,
    value: String
  }
};
</script>
