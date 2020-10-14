<template>
<section class="home-section">
  <h2 class="home-section__title title-blue">
    {{ title }}
  </h2>
  <div class="home-section__list">
    <div class="home-section__content">
      <template v-if="loading">
        <div
          v-for="count in amountSkeletonCard"
          :key="`${count}_${lowerTitle}`"
          class="home-section__item"
        >
          <SkeletonCard
            :type="lowerTitle"
            :line-count="skeletonLineCount"
          />
        </div>
      </template>
      <template v-if="hasItems">
        <div
          v-for="item in items"
          :key="`${item.id}_${lowerTitle}`"
          class="home-section__item"
        >
          <Component
            :is="components[componentName]"
            :item="item"
          />
        </div>
      </template>
      <NoResult
        v-if="!loading && !hasItems"
        class="home-section__no-result"
        text-for-speech-bubble="Morty, something happened! Data was not uploaded!"
      />
    </div>
  </div>

  <SkewLink
    v-if="!loading && hasItems"
    class="home-section__link"
    :text="`see all ${lowerTitle}`"
    :href="`/${title.toLowerCase()}`"
    :color="linkColor"
    @click.native="scrollToTop"
  />
</section>
</template>

<script>
import SkeletonCard from '../components/skeleton/SkeletonCard.vue';
import SkewLink from '../components/buttons/skew/SkewLink.vue';
import NoResult from '../components/noResult/NoResult.vue';
import CharacterCard from '../components/cards/CharacterCard.vue';
import LocationCard from '../components/cards/LocationCard.vue';
import EpisodeCard from '../components/cards/EpisodeCard.vue';

export default {
  name: 'HomeSection',

  components: {
    NoResult,
    SkewLink,
    SkeletonCard,
  },

  props: {
    title: {
      type: String,
      default: '',
    },
    items: {
      type: Array,
      default: null,
    },
    amountSkeletonCard: {
      type: Number,
      default: 5,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      components: {
        CharacterCard,
        LocationCard,
        EpisodeCard,
      },
    };
  },

  computed: {
    lowerTitle() {
      return this.title.toLowerCase();
    },

    hasItems() {
      return !!(this.items && this.items.length);
    },

    skeletonLineCount() {
      if (this.lowerTitle === 'characters') return 6;
      return 4;
    },

    linkColor() {
      if (this.lowerTitle === 'locations') return 'green';
      if (this.lowerTitle === 'episodes') return 'orange';

      return 'blue';
    },

    componentName() {
      if (this.lowerTitle === 'locations') return 'LocationCard';
      if (this.lowerTitle === 'episodes') return 'EpisodeCard';

      return 'CharacterCard';
    },
  },

  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="stylus">
.home-section
  display flex
  flex-direction column
  width 100%

  &__title
    font-size 35px

  &__list
    display flex
    justify-content space-between
    width 100%
    margin-top 30px

  &__content
    display flex
    justify-content space-between
    width 100%
    +lt-sm()
      flex-wrap wrap

  &__item
    width calc(100% / 6 - 10px)
    +lt-sm()
      margin-bottom 10px
    +sm()
      width calc(100% / 3 - 10px)
    +xs()
      width calc(100% / 2 - 10px)

  &__no-result
    width 100%
  &__link
    margin 30px auto 0 auto
</style>
