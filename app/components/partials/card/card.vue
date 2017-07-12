<template>
  <div class="card" @click="openFolder">
    <div class="card__image">
      {{ fileType }}
    </div>
    <div class="card__title">
      {{ title }}
      <span class="card__sub-title">#{{ subTitle }}</span>
    </div>
    <div class="card__info">
      <card-info-lines v-for='infoLine in infoLines' :title='infoLine.title' :value='infoLine.data'></card-info-lines>

    </div>
  </div>
  <div class="card">

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

    components: {
      cardInfoLine
    }
  };
</script>
