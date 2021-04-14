<template>
  <div class="list-filter">
    <div class="list-filter__title">{{ title }}:</div>
    <div class="list-filter__options">
      <div v-for="option in options" :key="option.value" @click="changeFilter(option.value)"
           :class="['list-filter__option', { 'list-filter__option--active': option.value === currentFilter }]">
        {{ option.title }}
      </div>
    </div>
  </div>
</template>

<style src="style/components/partials/list-filter.scss"></style>

<script>
export default {
  props: {
    options: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: 'Filters'
    }
  },
  data () {
    return {
      currentFilter: 'no-filter'
    };
  },

  methods: {
    changeFilter (newFilter) {
      this.$emit('filter-change', newFilter);
      this.currentFilter = newFilter;
    }
  }
};
</script>
