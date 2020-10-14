<template>
<router-link
  class="preview-card episode"
  :to="`/episodes/${item.id}`"
  @click.native="scrollToTop"
>
  <div class="preview-card__description">
    <p class="preview-card__paragraph name">
      Name: {{ item.name }}
    </p>
    <p class="preview-card__paragraph">
      Episode: {{ item.episode }}
    </p>
    <p class="preview-card__paragraph">
      Air date: {{ item.air_date }}
    </p>
  </div>
</router-link>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'EpisodeCard',

  mixins: [mixin],

  props: {
    item: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped src="./stylus.styl" lang="stylus">

</style>
