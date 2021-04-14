<template>
  <div class="state-spinner" :style="spinnerStyle">
    <svg class="state-spinner__svg" viewBox="25 25 50 50">
      <circle class="state-spinner__circle" cx="50" cy="50" r="20" fill="none" stroke-miterlimit="10" :style="circleStyle"/></circle></circle></circle></circle></circle></circle></circle></circle></circle></circle>
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#FFFFFF'
    },
    width: {
      type: Number,
      default: 28
    },
    border: {
      type: Number,
      default: 2
    }
  },

  computed: {
    spinnerStyle() {
      return {
        width: this.width + 'px',
      };
    },
    circleStyle() {
      return {
        'stroke-width': this.border,
        stroke: this.color
      };
    }
  }
};
</script>

<style src="style/components/partials/state/state-spinner.scss"></style>
