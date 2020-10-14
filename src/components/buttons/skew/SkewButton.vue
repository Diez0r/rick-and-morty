<template>
<button
  class="skew-button"
  :class="[color, type, { 'disabled' : loading }]"
  type="button"
  @click="handleClick"
>
  <span
    v-if="!loading"
    class="skew-button__text"
  >
    {{ text }}
  </span>

  <Spinner
    v-else
    class="skew-button__spinner"
  />
</button>
</template>

<script>
import skewMixin from './skewMixin';
import Spinner from '../../loaders/Spinner.vue';

export default {
  name: 'SkewButton',

  components: {
    Spinner,
  },

  mixins: [skewMixin],

  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="stylus" src="./skew.styl">
</style>
