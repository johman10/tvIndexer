<template>
  <div class="card" @click="$emit('click')">
    <div v-if="imageSource" class="card__image" :style="imageStyle"></div>
    <div v-else-if="imageText" class="card__image card__image--text">
      <div class="card__text">
        {{ imageText }}
      </div>
    </div>
    <div class="card__title-wrapper">
      <div :class="['card__title', { 'card__title--with-sub-title': !!subTitle }]">
        {{ title }}
      </div>
      <span v-if="subTitle" class="card__sub-title">{{ subTitle }}</span>
    </div>
    <card-info-line v-for='infoLine in infoLines' :key="infoLine.data" :title='infoLine.title' :value='infoLine.data'></card-info-line>
  </div>
</template>

<style src="style/components/partials/card/card.scss"></style>

<script>
import cardInfoLine from 'components/partials/card/card-info-line';

export default {
  props: {
    title: {
      type: String,
      required: true
    },
    imageSource: String,
    imageText: String,
    subTitle: String,
    infoLines: Array
  },

  data () {
    return {
      imageStyle: {
        backgroundImage: `url(${this.imageSource})`
      }
    };
  },

  components: {
    cardInfoLine
  }
};
</script>
