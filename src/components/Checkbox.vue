<template>
<div class="checkbox">
  <label class="checkbox__label">
    <input
      type="checkbox"
      class="checkbox__input"
      :value="value"
      :checked="isChecked"
      @change="updateCheckbox(item)"
    >
    <span class="checkbox__box" />

    <span class="checkbox__text">
      {{ `${item[0].toUpperCase()}${item.slice(1)}` }}
    </span>
  </label>
</div>
</template>

<script>
export default {
  name: 'Checkbox',

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    value: {
      type: [String, Number, Array],
      default: null,
    },

    item: {
      type: String,
      default: null,
    },
  },

  computed: {
    isChecked() {
      return this.item === this.value;
    },
  },

  methods: {
    updateCheckbox(value) {
      let updatedValue;

      if (typeof this.value === 'string') {
        updatedValue = value;
        this.$emit('change', updatedValue);
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.checkbox
  display flex

  &__input
    display none
    &:checked ~ .checkbox__box
      border-color transparent
      background-color $violet
      animation jelly .6s ease
      &:after
        opacity 1
        transform rotate(45deg) scale(1)

  &__label
    position relative
    display flex
    user-select none
    cursor pointer

    &:hover .checkbox__text
      color rgba($violet, 0.9)

  &__box
    display flex
    justify-content center
    align-items center
    width 17px
    height 17px
    border 1px solid #C8CCD4
    border-radius 3px
    transition background .1s ease
    cursor pointer
    &::after
      content ''
      position absolute
      top 1px
      left 6px
      width 5px
      height 11px
      opacity 0
      transform rotate(45deg) scale(0)
      border-right 2px solid $white
      border-bottom 2px solid $white
      transition all 0.2s ease
      transition-delay 0.15s

  &__text
    margin-left 5px
    vertical-align middle
    cursor pointer
    transition color 0.2s ease-in-out

@keyframes jelly
  from
    transform scale(1, 1)
  30%
    transform scale(1.25, 0.75)
  40%
    transform scale(0.75, 1.25)
  50%
    transform scale(1.15, 0.85)
  65%
    transform scale(.95, 1.05)
  75%
    transform scale(1.05, .95)
  to
    transform scale(1, 1)
</style>
