<template>
<div class="no-result">
  <SpeechBubble
    direction="right"
    position="center"
  >
    <p>
      {{ textForSpeechBubble }}
    </p>
  </SpeechBubble>
  <img
    class="no-result__img"
    src="@/assets/img/no-result.png"
    alt=""
  >
</div>
</template>

<script>
import SpeechBubble from '../SpeechBubble.vue';

export default {
  name: 'NoResult',

  components: {
    SpeechBubble,
  },

  props: {
    textForSpeechBubble: {
      type: String,
      default: 'Morty, you see there is nothing here, Morty!',
    },
  },
};
</script>

<style scoped lang="stylus">
.no-result
  display flex
  flex-direction  column
  align-items center

  &__img
    display block
    max-width 25%
    margin-top 15px

</style>
