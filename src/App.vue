<template>
<div id="app">
  <Header />
  <router-view />
  <Footer />
</div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Footer,
    Header,
  },
};
</script>

<style lang="stylus">
@import '~@/assets/stylus/styles.styl'

#app
  color #EAFCFF
  display flex
  flex-direction column
  justify-content space-between
  height 100%
  min-height 100%
</style>
