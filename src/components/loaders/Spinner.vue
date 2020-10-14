<template>
<div class="spinner">
  <div class="spinner__circle" />
</div>
</template>

<script>
export default {
  name: 'Spinner',
};
</script>

<style scoped lang="stylus">
.spinner
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%

  &__circle
    width 40px
    height 40px
    border-top 3px solid #9370DB
    border-right 3px solid transparent
    border-radius 50%
    animation rotation 0.8s linear infinite

@keyframes rotation{
  from {
    transform rotate(0deg)
  }
  to {
    transform rotate(360deg)
  }
}
</style>
