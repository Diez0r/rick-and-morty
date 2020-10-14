<template>
<main class="error df">
  <div class="container">
    <div class="row fdc aic">
      <SpeechBubble
        class="error__speech"
        text-size="medium"
      >
        <p>
          Morty, 404 error!
        </p>
        <p>
          Open your eyes wider!
        </p>
        <p>
          Morty, leaving here!
        </p>
      </SpeechBubble>

      <img
        src="@/assets/img/error-page.png"
        alt=""
        class="error__image"
      >
      <SkewLink
        class="error__link"
        text="main page"
      />
    </div>
  </div>
</main>
</template>

<script>
import SpeechBubble from '../components/SpeechBubble.vue';
import SkewLink from '../components/buttons/skew/SkewLink.vue';

export default {
  name: 'ErrorPage',

  components: {
    SkewLink,
    SpeechBubble,
  },
};
</script>

<style scoped lang="stylus">
.error
  &__row
    display flex
    flex-direction column
    align-items center

  &__speech
    align-self flex-start
    margin-left 35%
    +sm()
      margin-left 27%
    +xs()
      margin-left 20%

  &__image
    display block
    max-width 50%
    +sm()
      max-width 90%
    +xs()
      max-width 100%

  &__link
    margin-top 20px
    +sm()
      margin-top 30px
    +xs()
      margin-top 40px
</style>
