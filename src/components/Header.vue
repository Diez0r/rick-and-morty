<template>
<header class="header">
  <div class="container">
    <div class="row jcsb aic">
      <router-link
        class="header__logo title-blue"
        to="/"
      >
        Rick and Morty
      </router-link>

      <nav class="header__nav">
        <ul class="header__list">
          <li
            v-for="(link, index) in links"
            :key="`${index}_link`"
            class="header__item"
          >
            <router-link
              class="header__link bottom-line"
              :to="link.href"
            >
              {{ link.title }}
            </router-link>
          </li>
        </ul>
      </nav>
      <button
        class="header__show-mobile-menu"
        type="button"
        @click="openMobileMenu"
      >
        <span class="header__mobile-line" />
      </button>

      <transition name="fade">
        <MobileMenu
          v-if="showMobileMenu"
          class="header__mobile-menu"
          :links="links"
          @close-menu="closeMobileMenu"
        />
      </transition>
    </div>
  </div>
</header>
</template>

<script>
import MobileMenu from './MobileMenu.vue';

export default {
  name: 'Header',

  components: {
    MobileMenu,
  },

  data() {
    return {
      showMobileMenu: false,
      links: [
        { title: 'characters', href: '/characters' },
        { title: 'locations', href: '/locations' },
        { title: 'episodes', href: '/episodes' },
      ],
    };
  },

  methods: {
    openMobileMenu() {
      this.showMobileMenu = true;
    },

    closeMobileMenu() {
      this.showMobileMenu = false;
    },
  },
};
</script>

<style scoped lang="stylus">
.header
  display flex
  flex-grow 0
  flex-shrink 0
  flex-basis auto
  width 100%
  padding 20px 0

  &__logo
    font-size 24px

  &__list
    display flex

  &__item
    &:not(:last-of-type)
      margin-right 15px

  &__link
    font-size 20px
    color #84D57D
    +xs()
      display none
    &.router-link-exact-active
      &::before
        transform translateX(0)

  &__show-mobile-menu
    display none
    flex-direction column
    justify-content space-around
    align-items center
    width 34px
    height 34px
    +xs()
      display flex
    &::before,
    &::after
      content ''
      width 34px
      height 2px
      display block
      border-radius 10px
      background-color $white

  &__mobile-line
    width 34px
    height 2px
    border-radius 10px
    background-color $white

.fade-enter-active,
.fade-leave-active
  transform translateX(0)
  transition 0.2s

.fade-enter,
.fade-leave-to
  transform translateX(-100%)
  opacity 0
</style>
