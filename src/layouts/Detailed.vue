<template>
<div class="detailed container">
  <div class="row fdc">


    <h1 class="detailed__title title-blue">
      {{ pageData.title }}:
    </h1>

    <template v-if="loading.data">
      <div class="detailed__info">
        <div
          v-if="isCharacterPage"
          class="detailed__img-box"
        >
          <div class="detailed__avatar">
            <SkeletonAvatar
              class="detailed__skeleton-avatar"
            />
          </div>
        </div>
        <div class="detailed__dossier">
          <SkeletonLine
            :line-count="pageData.skeletonLineCount"
            height="30"
          />
        </div>
      </div>
    </template>

    <template v-if="detailedData">
      <div class="detailed__info">
        <div
          v-if="isCharacterPage"
          class="detailed__img-box"
        >
          <div class="detailed__avatar">
            <img
              v-if="detailedData.image"
              :src="detailedData.image"
              class="detailed__image"
              alt=""
            >
          </div>
        </div>
        <div class="detailed__dossier">
          <div
            v-for="(value, key, index) in detailedData"
            :key="`${index}__feature`"
            class="detailed__description"
          >
            <template v-if="key !== 'image' && key !== 'url' && key !== 'created' && !(value instanceof Object)">
              <p class="detailed__feature title-blue">
                {{ key | firstLetterToUppercase }}:
              </p>
              <p class="detailed__definition">
<!--                {{ removePartString(value, 'dimension') | firstLetterToUppercase }}-->
                {{ value }}
              </p>
            </template>
          </div>

          <template v-if="hasLinksData">
            <div
              v-for="(link, index) in detailedData.links"
              :key="`${index}__links`"
              class="detailed__description"
            >
              <p class="detailed__feature title-blue">
                {{ link.type | firstLetterToUppercase }}:
              </p>
              <router-link
                :to="`${link.href}`"
                class="detailed__definition bottom-two-line"
              >
                {{ link.name }}
              </router-link>
            </div>
          </template>
        </div>
      </div>
    </template>

    <h2
      v-if="hasLoadedData"
      class="detailed__subtitle title-blue"
    >
      {{ pageData.subtitle }}:
    </h2>

    <template v-if="loading.additionalContent">
      <div class="detailed__content">
        <div class="detailed__list">
          <div
            v-for="count in 5"
            :key="`${count}_character`"
            class="detailed__item"
          >
            <SkeletonCard
              :line-count="pageData.skeletonCardLineCount"
              :type="pageData.skeletonTypeCard"
            />
          </div>
        </div>
      </div>
    </template>

    <div
      v-if="!loading.additionalContent"
      class="detailed__content"
    >
      <div
        v-if="hasItems"
        class="detailed__list"
      >
        <div
          v-for="item in items"
          :key="`${item.id}_item`"
          class="detailed__item"
        >
          <Component
            :is="components[pageData.component]"
            :item="item"
          />
        </div>
        <div class="detailed__item" />
        <div class="detailed__item" />
        <div class="detailed__item" />
      </div>
      <NoResult
        v-else-if="hasItems"
        class="detailed__no-result"
        :text-for-speech-bubble="pageData.textForSpeechBubble"
      />
    </div>
    <NoResult
      v-if="!dataLoading && !hasLoadedData"
      class="detailed__no-data"
      text-for-speech-bubble="Morty,there's nothing here!"
    />
  </div>
</div>
</template>

<script>
import { firstLetterToUppercase, removePartString } from '../utils/utils.js';
import SkeletonAvatar from '../components/skeleton/SkeletonAvatar.vue';
import SkeletonLine from '../components/skeleton/SkeletonLine.vue';
import SkeletonCard from '../components/skeleton/SkeletonCard.vue';
import NoResult from '../components/noResult/NoResult.vue';
import CharacterCard from '../components/cards/CharacterCard.vue';
import EpisodeCard from '../components/cards/EpisodeCard.vue';

export default {
  name: 'DetailedInfo',
  components: {
    NoResult,
    SkeletonCard,
    SkeletonLine,
    SkeletonAvatar,
  },

  filters: {
    firstLetterToUppercase,
  },

  props: {
    items: {
      type: Array,
      default: null,
    },
    detailedData: {
      type: Object,
      default: null,
    },
    loading: {
      type: Object,
      default: null,
    },
  },

  data() {
    return {
      components: {
        CharacterCard,
        EpisodeCard,
      },
    };
  },

  computed: {
    hasItems() {
      return !!(this.items && this.items.length);
    },

    hasDetailedData() {
      const valueDetailedData = Object.values(this.detailedData);
      return !!(valueDetailedData && valueDetailedData.length);
    },

    hasLinksData() {
      return !!(this.hasDetailedData && this.detailedData.links && this.detailedData.links.length);
    },

    isCharacterPage() {
      return this.$route.fullPath.includes('character');
    },

    isEpisodePage() {
      return this.$route.fullPath.includes('episode');
    },

    isLocationPage() {
      return this.$route.fullPath.includes('location');
    },

    dataLoading() {
      return this.loading.data && this.loading.additionalContent;
    },

    hasLoadedData() {
      return !!(this.detailedData && this.items);
    },

    pageData() {
      let pageData = {};

      if (this.isCharacterPage) {
        pageData = {
          title: 'Character dossier',
          subtitle: 'Character in episodes',
          component: 'EpisodeCard',
          skeletonLineCount: 6,
          skeletonTypeCard: 'episodes',
          textForSpeechBubble: 'Morty, there were no episodes here, Morty!',
          skeletonCardLineCount: 4,
        };
      } else if (this.isEpisodePage) {
        pageData = {
          title: 'Episode information',
          subtitle: 'Characters in episode',
          component: 'CharacterCard',
          skeletonLineCount: 3,
          skeletonTypeCard: 'characters',
          textForSpeechBubble: 'Morty, there were no characters here, Morty!',
          skeletonCardLineCount: 8,
        };
      } else if (this.isLocationPage) {
        pageData = {
          title: 'Location information',
          subtitle: 'Residents in location',
          component: 'CharacterCard',
          textForSpeechBubble: 'Morty, there were no residents here, Morty!',
          skeletonLineCount: 3,
          skeletonTypeCard: 'characters',
          skeletonCardLineCount: 8,
        };
      }

      return pageData;
    },
  },

  methods: {
    removePartString,
  },
};
</script>

<style scoped lang="stylus">
.detailed
  &__title
    margin-top 25px
    font-size 45px
    +sm()
      font-size 40px
    +xs()
      font-size 30px

  &__info
    display flex
    justify-content flex-start
    align-items flex-end
    margin-top 35px
    +xs()
      flex-direction column
      align-items flex-start

  &__img-box
    position relative
    width 32%
    margin-right 5%
    +xs()
      width 50%
      align-self center

  &__avatar
    padding-top 100%
    width 100%

  &__image
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    border-radius 5px

  &__skeleton-avatar
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  &__dossier
    width 63%
    +sm()
      margin-top 30px
    +xs()
      width 100%
      margin-top 20px

  &__description
    display flex
    font-size 35px
    +lt-sm()
      font-size 22px
    &:not(:first-of-type)
      margin-top 5px

  &__definition
    margin-left 15px

  &__subtitle
    margin-top 45px
    font-size 45px
    +sm()
      font-size 40px
    +xs()
      font-size 30px

  &__content
    margin-top 70px
    +sm()
      margin-top 50px
    +xs()
      margin-top 40px

  &__list
    display flex
    flex-wrap wrap
    justify-content space-between
    width 100%

  &__item
    width calc(100% / 5 - 15px)
    margin-bottom 20px
    +sm()
      width calc(100% / 3 - 15px)
    +xs()
      width calc(100% / 2 - 4px)

  &__no-result
    margin-top 15px

  &__no-data
    height 30vh
    /deep/ .no-result__img
      max-width 40%
    +sm()
      height 60vh
      /deep/ .no-result__img
        max-width 60%
    +xs()
      height 50vh
      /deep/ .no-result__img
        max-width 90%

</style>
