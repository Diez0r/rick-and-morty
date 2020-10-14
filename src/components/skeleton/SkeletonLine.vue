<template>
<div class="skeleton-lines">
  <div
    v-for="count in Number(lineCount)"
    :key="`${count}_line`"
    :style="{height: `${height}px`}"
    class="skeleton-lines__item"
  />
</div>
</template>

<script>
export default {
  name: 'SkeletonLine',

  props: {
    lineCount: {
      type: [Number, String],
      default: 1,
    },
    height: {
      type: [Number, String],
      default: 14,
    },
  },
};
</script>

<style lang="stylus">
.skeleton-lines
  display flex
  flex-direction column

  &__item
    width 100%
    height 14px
    border-radius 7px
    background-color #ccc
    background-image linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)
    background-size 200%
    animation shine-lines 2s infinite linear
    &:last-of-type
      width 60%
    &:not(:first-of-type)
      margin-top 20px

@keyframes shine-lines
  0%
    background-position 200%
  40%, 100%
    background-position -100%
</style>
