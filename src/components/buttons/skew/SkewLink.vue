<template>
<router-link
  class="skew-button"
  :class="[color, type]"
  :to="href"
  type="button"
  @click="handleClick"
>
  <span class="skew-button__text">
    {{ text }}
  </span>
</router-link>
</template>

<script>
import skewMixin from './skewMixin';

export default {
  name: 'SkewLink',

  mixins: [skewMixin],

  props: {
    href: {
      type: String,
      default: '/',
    },
  },
};
</script>

<style lang="stylus" src="./skew.styl">
</style>
