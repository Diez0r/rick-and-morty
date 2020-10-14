<template>
<router-link
  class="preview-card location"
  :to="`/locations/${item.id}`"
  @click.native="scrollToTop"
>
  <div class="preview-card__description">
    <p class="preview-card__paragraph name">
      Name: {{ item.name }}
    </p>
    <p class="preview-card__paragraph">
      type: {{ item.type }}
    </p>
    <p class="preview-card__paragraph">
      dimension: {{ item.dimension }}
    </p>
  </div>
</router-link>
</template>

<script>
import mixin from './mixin';

export default {
  name: 'LocationCard',

  mixins: [mixin],

  props: {
    item: {
      type: Object,
      default: null,
    },
  },
};
</script>

<style scoped>

</style>
