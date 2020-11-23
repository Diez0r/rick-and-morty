<template>
<div
  v-if="filtersCount && hasItems"
  class="filters-desktop"
>
  <p class="filters-desktop__text">
    Selected filters:
  </p>
  <div class="filters-desktop__buttons">
    <button
      v-for="(value, key) in selectedFilters"
      :key="key"
      class="filters-desktop__button"
      type="button"
      @click="updateFilters(value, key)"
    >
      {{ key | firstLetterToUppercase }}: {{ value | firstLetterToUppercase }}
      <span class="filters-desktop__cross" />
    </button>
    <button
      v-if="filtersCount >= 2"
      class="filters-desktop__button"
      type="button"
      @click="resetFilters"
    >
      reset all
      <span class="filters-desktop__cross" />
    </button>
  </div>
</div>
</template>

<script>
import { firstLetterToUppercase } from '../../utils/utils.js';

export default {
  name: 'DesktopFilters',

  filters: {
    firstLetterToUppercase,
  },

  props: {
    hasItems: {
      type: Boolean,
      default: false,
    },

    selectedFilters: {
      type: Object,
      default: null,
    },

    filtersCount: {
      type: [String, Number],
      default: 0,
    },
  },

  methods: {
    updateFilters(value, key) {
      const updateParamsData = {
        paramsName: key,
        value,
      };
      this.$emit('update-filters', updateParamsData);
    },

    resetFilters() {
      this.$emit('reset-filters');
    },
  },
};
</script>

<style scoped lang="stylus">
.filters-desktop
  display flex
  align-items center

  &__buttons
    margin-left 30px

  &__button
    position relative
    padding 5px 35px 5px 15px
    margin-bottom 10px
    border 1px solid #C8CCD4
    border-radius 3px
    transition background-color 0.2s ease-in-out

    &:not(:last-of-type)
      margin-right: 15px

    &:hover
      background-color $violet

  &__cross
    position absolute
    top 50%
    right 7px
    width 15px
    height 15px
    transform translateY(-50%)

    &::before,
    &::after
      content ''
      position absolute
      top 50%
      left 50%
      width 100%
      height 1px
      background-color $white

    &::before
      transform translate(-50%, -50%) rotate(45deg)

    &::after
      transform translate(-50%, -50%) rotate(-45deg)
</style>
