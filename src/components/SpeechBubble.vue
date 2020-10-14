<template>
<div
  :class="[direction, `position-${position}`]"
  class="speech-bubble"
>
  <div
    class="speech-bubble__container"
    :class="textSize"
  >
    <slot />
  </div>
</div>
</template>

<script>
export default {
  name: 'SpeechBubble',

  props: {
    direction: {
      type: String,
      default: 'left',
      validator(direction) {
        return ['left', 'right'].indexOf(direction) !== -1;
      },
    },

    position: {
      type: String,
      default: 'left',
      validator(position) {
        return ['left', 'right', 'center'].indexOf(position) !== -1;
      },
    },

    textSize: {
      type: String,
      default: 'small',
      validator(textSize) {
        return ['small', 'medium'].indexOf(textSize) !== -1;
      },
    },
  },
};
</script>

<style scoped lang="stylus">
.speech-bubble
  background-color #fff
  border solid 2px #000
  border-radius 12px
  display inline-block
  margin 8px
  padding 8px 16px
  position relative

  &::before
  &::after
    content ''
    position:absolute
    height 0
    width 0

  &::before
    border solid 12px transparent
    border-left solid 12px #000
    border-top solid 12px #000
    bottom -24px

  &::after
    border solid 10px transparent
    border-left solid 10px #fff
    border-top solid 10px #fff
    bottom -19px

  &.left
    &::before
      transform skew(-15deg)
    &::after
      left 27px
      transform: skew(-15deg)

  &.right
    &::before
      transform skew(45deg)
    &::after
      transform skew(45deg)

  &.position-left
    &::before
      left 24px
    &::after
      left 27px

  &.position-center
    &::before,
    &::after
      left 50%
      &.right
        transform translateX(-50%), skew(45deg)
      &.left
        transform translateX(-50%), skew(-15deg)

  &.position-right
    &::before
      right 24px
    &::after
      left auto
      right 27px

  &__container
    color $black
    &.medium p
      font-size 40px
      +sm()
        font-size 30px
      +xs()
        font-size 20px
      &:not(:first-of-type)
        margin-top 7px

    &.small p
      font-size 18px
      &:not(:first-of-type)
        margin-top 5px
</style>
