<template>
<footer class="footer">
  <div class="container">
    <div class="row jcfe">
      <p class="footer__text">
        Thanks to
        <a
          href="https://axelfuhrmann.com/"
          class="footer__link bottom-two-line"
          target="_blank"
        >
          Axel Fuhrmann
        </a>
        for
        <a
          href="https://rickandmortyapi.com/documentation/"
          class="footer__link bottom-two-line"
          target="_blank"
        >
          API
        </a>
      </p>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
};
</script>

<style scoped lang="stylus">
.footer
  display flex
  flex-grow 0
  flex-shrink 0
  flex-basis auto
  margin-top 35px
  padding 20px 0
</style>
