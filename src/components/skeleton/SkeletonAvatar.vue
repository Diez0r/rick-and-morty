<template>
<div class="skeleton-avatar">
  <div class="skeleton-avatar__image" />
</div>
</template>

<script>
export default {
  name: 'SkeletonAvatar',
};
</script>

<style scoped lang="stylus">
.skeleton-avatar
  position absolute
  top 0
  left 0
  width 100%
  height 100%

  &__image
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background-color #ccc
    border-radius 5%
    background-image linear-gradient(90deg, #ddd 0px, #e8e8e8 40px, #ddd 80px)
    background-size 200%
    animation shine-avatar 2s infinite linear

@keyframes shine-avatar
  0%
    background-position 200%
  40%, 100%
    background-position -100%
</style>
