<template>
<div class="no-items">
  <SpeechBubble position="right">
    <p>
      Morty! Nothing here, Morty! Need to reset filters faster!
    </p>
  </SpeechBubble>

  <img
    class="no-items__img"
    src="@/assets/img/no-items.png"
    alt=""
  >

  <SkewButton
    class="no-items__button"
    text="reset filters"
    :color="buttonColor"
    @click="handleClick"
  />
</div>
</template>

<script>
import SkewButton from '../buttons/skew/SkewButton.vue';
import SpeechBubble from '../SpeechBubble.vue';

export default {
  name: 'NoItems',

  components: {
    SpeechBubble,
    SkewButton,
  },

  props: {
    buttonColor: {
      type: String,
      default: 'blue',
    },
  },

  methods: {
    handleClick() {
      this.$emit('reset-filters');
    },
  },
};
</script>

<style scoped lang="stylus">
.no-items
  display flex
  flex-direction  column
  align-items center

  &__img
    display block
    max-width 50%
    margin-top 20px

  &__button
    margin-top 30px
    min-height 55px
</style>
