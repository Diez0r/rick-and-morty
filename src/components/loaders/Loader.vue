<template>
<div class="preloader">
  <div class="preloader__loader"></div>
</div>
</template>

<script>
export default {
  name: 'Loader',
};
</script>

<style scoped lang="stylus">
.preloader
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color: rgba(#000, 0.5)

  &__loader
    display block
    position relative
    left 50%
    top 50%
    width 150px
    height 150px
    margin -75px 0 0 -75px
    border-radius 50%
    border 3px solid transparent
    border-top-color #9370DB
    animation spin 2s linear infinite

    &::before,
    &::after
      content ''
      position absolute
      border-radius: 50%
      border 3px solid transparent

    &::before
      top: 5px
      left: 5px
      right: 5px
      bottom: 5px
      border-top-color: #BA55D3
      animation: spin 3s linear infinite

    &::after
      top 15px
      left 15px
      right 15px
      bottom 15px
      border-top-color #FF00FF
      animation spin 1.5s linear infinite


@keyframes spin {
  0% {

    transform rotate(0deg)
  }
  100% {
    transform rotate(360deg)
  }
}
</style>
