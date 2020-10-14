<template>
<router-link
  class="preview-card character"
  :to="`/characters/${item.id}`"
  @click.native="scrollToTop"
>
  <div class="preview-card__img-box">
    <img
      class="preview-card__img"
      :src="item.image"
      alt=""
    >
  </div>

  <div class="preview-card__description">
    <p class="preview-card__paragraph name">
      Name: {{ item.name }}
    </p>
    <p class="preview-card__paragraph">
      Species: {{ item.species }}
    </p>
    <p class="preview-card__paragraph">
      Status: {{ item.status }}
    </p>
    <p class="preview-card__paragraph">
      Gender: {{ item.gender }}
    </p>
    <p class="preview-card__paragraph">
      Origin: {{ item.origin.name }}
    </p>
  </div>
</router-link>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'CharacterCard',

  mixins: [mixin],

  props: {
    item: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style src="./stylus.styl" lang="stylus">
</style>
