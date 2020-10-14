<template>
<div class="catalog df aifs">
  <div class="container">
    <div class="row fdc">
      <h1 class="catalog__title title-blue">
        {{ pageData.title }}
      </h1>
      <div class="catalog__main">
        <aside class="catalog__sidebar">
          <template v-if="filters">
            <p class="catalog__sidebar-title  title-blue">
              Filters
            </p>
            <div
              v-for="(filter, index) in filters"
              :key="`${index}_filter`"
              class="catalog__sidebar-filter"
            >
              <p class="catalog__sidebar-subtitle">
                {{ filter.title | firstLetterToUppercase }}
              </p>
              <ul class="catalog__sidebar-list">
                <li
                  v-for="(item, count) in filter.items"
                  :key="`${count}_character-filter`"
                  class="catalog__sidebar-item"
                >
                  <Checkbox
                    :value="params[filter.title]"
                    :item="item"
                    @change="updateFilters({ value: $event, paramsName: filter.title})"
                  />
                </li>
              </ul>
            </div>
          </template>
        </aside>

        <div class="catalog__inner">
          <div class="catalog__content">
            <DesktopFilters
              class="filters-desktop"
              :has-items="hasItems"
              :selected-filters="selectedFilters"
              :filters-count="filtersCount"
              @update-filters="updateFilters($event)"
              @reset-filters="resetFilters"
            />

            <div
              v-if="filters"
              class="filters-mobile"
            >
              <transition name="fade">
                <MobileFilters
                  v-if="showMobileFilters"
                  :filters="filters"
                  :params="params"
                  :selected-filters="selectedFilters"
                  :has-selected-filters="!!filtersCount"
                  @update-filters="updateFilters($event)"
                  @close-filters="toggleVisibleMobileFilters"
                />
              </transition>
              <button
                class="filters-mobile__button"
                type="button"
                @click="toggleVisibleMobileFilters"
              >
                <img
                  class="filters-mobile__icon"
                  src="@/assets/img/filter.svg"
                  alt=""
                >
                <span
                  v-if="filtersCount > 0"
                  class="filters-mobile__count"
                >
                  {{ filtersCount }}
                </span>
              </button>
            </div>

            <ul class="catalog__list">
              <template>
                <li
                  v-for="item in items"
                  :key="`${item.id}_item`"
                  class="catalog__card-item"
                >
                  <Component
                    :is="pageData.component"
                    :item="item"
                  />
                </li>
                <li class="catalog__card-item" />
                <li class="catalog__card-item" />
              </template>
              <template v-if="!hasItems && loading.firstLoading">
                <li
                  v-for="count in 8"
                  :key="`${count}_skeleton-item`"
                  class="catalog__card-item"
                >
                  <SkeletonCard
                    :line-count="pageData.skeletonCardLineCount"
                    :type="pageData.skeletonTypeCard"
                    :line-height="12"
                  />
                </li>
              </template>
            </ul>

            <NoItems
              v-if="!hasItems && !loading.firstLoading"
              :button-color="pageData.buttonColor"
              @reset-filters="resetFilters"
            />

            <Loader v-if="loading.newPage" />
          </div>

          <Pagination
            v-if="hasItems && paginationData.pages > 1"
            :loading="isLoading"
            :quantity-pages="paginationData.pages"
            :current-page="currentPage"
            :quantity-visible-pages="6"
            :color-for-button="pageData.buttonColor"
            @page-change="pageChange"
            @load-more="loadMore"
          />
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { firstLetterToUppercase } from '../utils/utils.js';
import Checkbox from '../components/Checkbox.vue';
import Pagination from '../components/Pagination.vue';
import Loader from '../components/loaders/Loader.vue';
import NoItems from '../components/noResult/NoItems.vue';
import SkeletonCard from '../components/skeleton/SkeletonCard.vue';
import MobileFilters from '../components/filters/MobileFilters.vue';
import DesktopFilters from '../components/filters/DesktopFilters.vue';
import CharacterCard from '../components/cards/CharacterCard.vue';
import LocationCard from '../components/cards/LocationCard.vue';
import EpisodeCard from '../components/cards/EpisodeCard.vue';

export default {
  name: 'Catalog',

  components: {
    DesktopFilters,
    MobileFilters,
    SkeletonCard,
    NoItems,
    Loader,
    Pagination,
    Checkbox,
    CharacterCard,
    LocationCard,
    EpisodeCard,
  },

  filters: {
    firstLetterToUppercase,
  },

  props: {
    filters: {
      type: [Object, Array],
      default: null,
    },

    params: {
      type: Object,
      default: null,
    },

    items: {
      type: Array,
      default: null,
    },

    paginationData: {
      type: Object,
      default: null,
    },

    currentPage: {
      type: [Number, String],
      default: 1,
    },

    loading: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      showMobileFilters: false,
      components: {
        CharacterCard,
        LocationCard,
        EpisodeCard,
      },
    };
  },

  computed: {
    isCharacterPage() {
      return this.$route.fullPath.includes('character');
    },

    isEpisodePage() {
      return this.$route.fullPath.includes('episode');
    },

    isLocationPage() {
      return this.$route.fullPath.includes('location');
    },

    filtersCount() {
      if (!this.params) return 0;

      let count = 0;

      Object.values(this.params).forEach((item) => {
        if (item) count += 1;
      });

      return count;
    },

    hasItems() {
      return !!(this.items && this.items.length);
    },

    selectedFilters() {
      if (!this.params) return {};

      const selectedFilters = {};

      Object.entries(this.params).forEach(([key, value]) => {
        if (value && value !== '') {
          selectedFilters[key] = value;
        }
      });

      return selectedFilters;
    },

    pageData() {
      let pageData = {};

      if (this.isCharacterPage) {
        pageData = {
          title: 'Characters',
          skeletonTypeCard: 'characters',
          skeletonCardLineCount: 8,
          buttonColor: 'blue',
          component: 'CharacterCard',
        };
      } else if (this.isLocationPage) {
        pageData = {
          title: 'Locations',
          skeletonTypeCard: 'locations',
          skeletonCardLineCount: 4,
          buttonColor: 'green',
          component: 'LocationCard',
        };
      } else if (this.isEpisodePage) {
        pageData = {
          title: 'Episodes',
          skeletonTypeCard: 'episodes',
          skeletonCardLineCount: 4,
          buttonColor: 'orange',
          component: 'EpisodeCard',
        };
      }

      return pageData;
    },

    isLoading() {
      return !!(this.loading.newPage || this.loading.moreItems);
    },
  },

  methods: {
    updateFilters({ value, paramsName }) {
      this.$emit('update-filters', { value, paramsName });
    },

    pageChange(page) {
      this.$emit('page-change', page);
    },

    loadMore() {
      this.$emit('load-more');
    },

    resetFilters() {
      this.$emit('reset-filters');
    },

    toggleVisibleMobileFilters() {
      this.showMobileFilters = !this.showMobileFilters;
    },
  },
};
</script>

<style scoped lang="stylus">
.catalog
  &__title
    width 100%
    margin-top 30px
    font-size 43px

  &__main
    display flex
    align-items flex-start
    margin-top 30px

  &__sidebar
    position sticky
    top 10px
    width 20%
    +lt-sm()
      display none

  &__sidebar-title
    font-size 23px
    letter-spacing 1.2px

  &__sidebar-filter
    margin-top 25px

  &__sidebar-subtitle
    display inline-flex
    position relative
    font-size 20px
    letter-spacing 1.2px
    border-bottom 1px solid $white

  &__sidebar-list
    margin-top 15px

  &__sidebar-item
    &:not(:first-of-type)
      margin-top 5px

  &__inner
    position relative
    width 80%
    +lt-sm()
      width 100%

  &__content
    display flex
    flex-direction column
    flex-wrap wrap
    width 100%

  &__content
    width 100%

  &__list
    display flex
    flex-wrap wrap
    justify-content space-between
    width 100%

  &__card-item
    width calc(100% / 4 - 15px)
    margin-bottom 20px
    +sm()
      width calc(100% / 3 - 15px)
    +xs()
      width calc(100% / 2 - 4px)

.filters-desktop
  +lt-sm()
    display none

.filters-mobile
  display none
  +lt-sm()
    display block
    margin-bottom 30px

  &__button
    position relative
    display flex
    justify-content center
    align-items center
    width 30px
    height 30px
    border-radius 50%

  &__icon
    width 20px
    height 20px
    transform rotate(90deg)

  &__count
    position absolute
    top -10px
    right -10px
    font-weight bold

.fade-enter-active,
.fade-leave-active
  transform translateX(0)
  transition 0.2s

.fade-enter,
.fade-leave-to
  transform translateX(-100%)
  opacity 0

</style>
