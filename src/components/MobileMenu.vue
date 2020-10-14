<template>
<div class="mobile-menu">
  <button
    class="mobile-menu__close-btn"
    type="button"
    @click="handleClose"
  />
  <router-link
    class="mobile-menu__main-link title-blue"
    to="/"
  >
    Rick and Morty
  </router-link>
  <nav class="mobile-menu__nav">
    <ul class="mobile-menu__list">
      <li
        v-for="(link, index) in links"
        :key="`${index}_mobile-link`"
        class="mobile-menu__item title-blue"
      >
        <router-link
          class="mobile-menu__link"
          :to="link.href"
          @click.native="handleClose"
        >
          {{ link.title }}
        </router-link>
      </li>
    </ul>
  </nav>
</div>
</template>

<script>
export default {
  name: 'MobileMenu',

  props: {
    links: {
      type: Array,
      default: null,
    },
  },

  methods: {
    handleClose() {
      this.$emit('close-menu');
    },
  },
};
</script>

<style scoped lang="stylus">
.mobile-menu
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background-color $dark-blue
  z-index 20
  padding 30px

  &__close-btn
    position absolute
    z-index 250
    top 10px
    right 20px
    width 40px
    height 40px
    display flex
    justify-content center
    align-items center

    &::before,
    &::after
      content ''
      position absolute
      width 30px
      height 2px
      background-color $white

    &::before
      transform rotate(45deg)

    &::after
      transform rotate(-45deg)

  &__main-link
    font-size 25px

  &__nav
    margin-top 30px

  &__list
    margin-top 20px

  &__item
    &:not(:first-of-type)
      margin-top 15px

  &__link
    font-size 18px
</style>
