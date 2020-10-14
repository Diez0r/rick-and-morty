<template>
<div class="search">
  <form
    action.prevent
    class="header__form"
  >
    <input
      ref="input"
      v-model="searchQuery"
      class="search__input"
      type="search"
      autocomplete="off"
      placeholder="search characters"
      @focus="focus = true"
      @blur="focus = false"
      @input="searchCharacters"
    >
  </form>
  <span
    v-if="errorMessage !== '' && focus"
    class="search__error-text"
  >
    {{ errorMessage }}
  </span>
  <div
    v-if="hasResult && focus"
    class="search__results"
  >
    <ul class="search__list">
      <li
        v-for="result in results"
        :key="`${result.id}_result`"
        class="search__item"
      >
        <router-link
          class="search__results-link"
          :to="`/characters/${result.id}`"
          @click.self.stop="test"
        >
          {{ result.name }}
        </router-link>
      </li>
      <li
        v-if="results.length >= 5"
        class="search__item"
      >
        <button
          class="search__results-link"
          type="button"
          @click="showAllSearchResult"
        >
          See all results
        </button>
      </li>
    </ul>
  </div>
  <div class="search__buttons">
    <button
      v-if="!errorMessage"
      class="search__button loupe"
      type="button"
      @click="searchCharacters"
    />
    <button
      v-else
      class="search__button"
      type="button"
      @click="resetSearchQuery"
    />
  </div>
</div>
</template>

<script>
import urls from '../constants';

export default {
  name: 'SearchInput',

  data() {
    return {
      urls,
      results: null,
      loading: false,
      searchQuery: '',
      errorMessage: '',
      focus: false,
    };
  },

  computed: {
    hasResult() {
      return !!(this.results && this.results.length);
    },
  },

  methods: {
    async searchCharacters() {
      if (!this.searchQuery) {
        this.results = null;
        return;
      }

      if (this.searchQuery.length <= 2) {
        this.errorMessage = 'not less than 2 characters';
        return;
      }
      this.errorMessage = '';

      try {
        const response = await fetch(
          `${urls.characters}/?name=${this.searchQuery}`,
        ).then((resp) => resp.json());

        this.results = response.results.slice(0, 5);
      } catch (e) {
        this.errorMessage = 'nothing';
      }
    },

    test() {
      this.focus = true;
      console.log(1);
    },

    showAllSearchResult() {
      this.$router.push('/');
    },

    resetSearchQuery() {
      this.searchQuery = '';
    },
  },
};
</script>

<style scoped lang="stylus">
.search
  position relative
  width 30%

  &__input
    width 100%
    padding 7px 10px
    border 1px solid $white
    border-radius 3px
    transition border-color 0.3s ease-in-out
    &:focus
      border-color $blue

  &__results
    position absolute
    left 0
    top calc(100% - 1px)
    z-index 300
    box-sizing border-box
    width 100%
    background-color $dark-blue
    border-radius 0 0 5px 5px
    border 1px solid $blue
    border-top-color $blue

  &__error-text
    position absolute
    top 50%
    right 50px
    transform translateY(-50%)
    color $red

  &__buttons
    position absolute
    top 1px
    right 1px
    display flex
    justify-content center
    align-items center
    height 32px
    width 34px
    background-color $dark-blue
    border-radius 3px

  &__button
    width 100%
    height 100%
    font-size 0

    &.loupe
      &::before,
      &::after
        content ''
        position absolute

      &::before
        top 6px
        left 0
        width: 15px
        height: 15px
        border 2px solid $white
        border-radius 50%

      &::after
        bottom 0
        right 0
        width 12px
        height 2px
        background-color $white
        transform translate(-13px, -9px) rotate(48deg)

    &.cross
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

  &__item
    padding 7px 15px

  &__results-link
    transition color 0.2s ease-in-out
    &:hover
      color $violet

</style>
