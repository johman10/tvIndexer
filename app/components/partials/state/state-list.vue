<template>
  <div class="state" v-if="!showList">
    <div class="state__loading" v-if="loading">
      <state-spinner color="#000000" /></div>
    <div class="state__empty" v-else-if="empty">
      {{ emptyMessage }}
    </div>
  </div>
</template>

<script>
import stateSpinner from 'components/partials/state/state-spinner';

export default {
  components: {
    stateSpinner
  },

  props: {
    loading: Boolean,
    empty: Boolean,
    emptyMessage: {
      type: String,
      default: 'No results.'
    },
    showList: Boolean
  },

  watch: {
    loading: 'updateShowList',
    empty: 'updateShowList'
  },

  methods: {
    updateShowList () {
      const newShowList = !this.loading && !this.empty;
      this.$emit('update:showList', newShowList);
    }
  }
};
</script>

<style src="style/components/partials/state/state-list.scss"></style>
