<template>
<div
  class="skeleton-card"
  :class="[type]"
>
  <div
    v-if="type === 'characters'"
    class="skeleton-card__avatar-box"
  >
    <SkeletonAvatar />
  </div>
  <div class="skeleton-card__lines">
    <SkeletonLine
      :line-count="Number(lineCount)"
      :height="Number(lineHeight)"
    />
  </div>
</div>
</template>

<script>
import SkeletonAvatar from './SkeletonAvatar.vue';
import SkeletonLine from './SkeletonLine.vue';

export default {
  name: 'SkeletonCard',

  components: {
    SkeletonLine,
    SkeletonAvatar,
  },

  props: {
    type: {
      type: String,
      default: 'episodes',
      validator(type) {
        return ['characters', 'episodes', 'locations'].indexOf(type) !== -1;
      },
    },

    lineCount: {
      type: [Number, String],
      default: 1,
    },

    lineHeight: {
      type: [Number, String],
      default: 10,
    },
  },
};
</script>

<style scoped lang="stylus">
.skeleton-card
  position relative
  box-sizing border-box
  padding 20px
  &.characters
    background-color $blue
  &.locations
    background-color $green
    height 144px
  &.episodes
    background-color $orange
    height 145px

  &__lines
    .skeleton-card__avatar-box + &
      margin-top 20px

  &__avatar-box
    position relative
    width 100%
    padding-top 80%
</style>
