<template>
<div class="filters">
  <p class="filters__title title-blue">
    Filters
  </p>
  <button
    class="filters__close-btn"
    type="button"
    @click="handleClose"
  />

  <ul class="filters__list">
    <li
      v-for="(filter, index) in filters"
      :key="`${index}_mobile-filter`"
      class="filters__item"
    >
      <button
        class="filters__button"
        type="button"
        @click="handleClick(index)"
      >
        <span class="filters-name">
          {{ filter.title | firstLetterToUppercase }}
        </span>
        <template v-if="hasSelectedFilters && selectedFilters[filter.title]">
          :
          <span class="filters__selected-filter title-blue">
            {{ selectedFilters[filter.title] | firstLetterToUppercase }}
          </span>
        </template>

        <span class="filters__arrow" />
      </button>

      <transition name="translate">
        <div
          v-if="selectedFilterIndex === index"
          class="filters__inner"
        >
          <button
            class="filters__back-btn title-blue"
            type="button"
            @click="resetSelectedFilterIndex"
          >
            Back
          </button>
          <ul class="filters__sublist">
            <li
              v-for="(item, count) in filters[selectedFilterIndex].items"
              :key="`${count}_character-filter`"
              class="filters__subitem"
            >
              <Checkbox
                :item="item"
                :value="selectedParams[filter.title]"
                @change="updateFilters($event, filter.title)"
              />
            </li>
          </ul>

          <transition name="fade">
            <div
              v-if="filterWasChange"
              class="filters__choices-buttons"
            >
              <SkewButton
                class="filters__choices-button"
                text="apply"
                @click="applyFilter"
              />
              <SkewButton
                class="filters__choices-button"
                text="reset"
                @click="resetSelectedFilter(filter.title)"
              />
            </div>
          </transition>
        </div>
      </transition>
    </li>
  </ul>
</div>
</template>

<script>
import { firstLetterToUppercase } from '../../utils/utils.js';
import Checkbox from '../Checkbox.vue';
import SkewButton from '../buttons/skew/SkewButton.vue';

export default {
  name: 'MobileFilters',
  components: {
    SkewButton,
    Checkbox,
  },

  filters: {
    firstLetterToUppercase,
  },

  props: {
    filters: {
      type: Array,
      default: null,
    },

    params: {
      type: Object,
      default: null,
    },

    selectedFilters: {
      type: Object,
      default: null,
    },

    hasSelectedFilters: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      selectedFilterIndex: null,
      selectedFilter: {},
      selectedParams: { ...this.params },
    };
  },

  computed: {
    filterWasChange() {
      let wasChange = false;
      Object.keys(this.params).forEach((key) => {
        if (this.params[key] !== this.selectedParams[key]) {
          wasChange = true;
        }
      });

      return wasChange;
    },
  },

  methods: {
    handleClick(index) {
      this.selectedFilterIndex = index;
    },

    resetSelectedFilterIndex() {
      this.selectedFilterIndex = null;
    },

    applyFilter() {
      const { value, paramsName } = this.selectedFilter;
      this.$emit('update-filters', { value, paramsName });
      this.handleClose();
      this.resetSelectedFilterIndex();
    },

    resetSelectedFilter(title) {
      if (this.params[title]) {
        this.selectedParams[title] = this.params[title];
      } else {
        this.selectedParams[title] = '';
      }

      this.selectedFilter = null;
    },

    updateFilters(value, paramsName) {
      if (this.selectedParams[paramsName].includes(value)) {
        this.selectedParams[paramsName] = '';
      } else {
        this.selectedParams[paramsName] = value;
        this.selectedFilter = { value, paramsName };
      }
    },

    handleClose() {
      this.$emit('close-filters');
    },
  },
};
</script>

<style scoped lang="stylus">
.filters
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color $dark-blue
  z-index 100

  &__title
    margin 30px 0 0 20px
    font-size 21px
    letter-spacing 1.2px

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
      width 20px
      height 2px
      background-color $white

    &::before
      transform rotate(45deg)

    &::after
      transform rotate(-45deg)

  &__list
    width 100%
    height 100%
    margin-top 50px

  &__item
    position relative
    font-size 18px
    padding 10px 20px
    border-bottom 1px solid $white

    &:last-of-type
      border-bottom 1px solid $white

  &__button
    position relative
    width 100%
    text-align left

  &__arrow
    position absolute
    display flex
    justify-content center
    align-items center
    z-index 100
    top 50%
    right 20px
    width 15px
    height 15px
    transform translateY(-50%)

    &::after
      content ''
      width 6px
      height 6px
      transform rotate(-45deg)
      border-right 2px solid white
      border-bottom 2px solid white

  &__inner
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    background-color $dark-blue
    z-index 200

  &__back-btn
    position relative
    margin 30px 0 0 20px
    padding-left 35px
    font-size 21px
    letter-spacing 1.2px

    &::before,
    &::after
      content ''
      position absolute
      top 50%
      left 0

    &::before
      transform translateY(-50%) rotate(135deg)
      width 10px
      height 10px
      border-right 3px solid $white
      border-bottom 3px solid $white
      transition border-color 0.2s ease-in-out


    &::after
      margin-top -1px
      width 25px
      height 2px
      z-index 250
      background-color $white
      transition background-color 0.2s ease-in-out

    &:hover
      &::before
        border-color $violet

      &::after
        background-color $violet

  &__sublist
    padding 30px 20px 20px 20px

  &__subitem
    &:not(:first-of-type)
      margin-top 10px

  &__choices-buttons
    display flex
    justify-content center
    margin-top 30px

  &__choices-button
    height: 40px

.translate-enter-active,
.translate-leave-active
  transform translateX(0)
  transition 0.2s

.translate-enter,
.translate-leave-to
  transform translateX(-100%)
  opacity 0

.fade-enter-active,
.fade-leave-active
  transition opacity .5s

.fade-enter,
.fade-leave-to
  opacity 0
</style>
