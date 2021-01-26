<template>
<main class="home df">
  <div class="container fdc">
    <section class="home__hero">
      <div class="home__greeting">
        <SpeechBubble
          direction="right"
          text-size="medium"
        >
          <p>
            Wubba-lubba-dub-dub!!
          </p>
        </SpeechBubble>

        <img
          src="@/assets/img/hello.png"
          alt=""
          class="home__image"
        >
      </div>

      <div class="home__info">
        <p class="home__description">
          This website is devoted to the cartoon Rick and Morty.
        </p>
        <p class="home__description">
          Here you can find information about the characters, locations and episodes.
        </p>
        <p class="home__description">
          Nice Squanch!
        </p>
      </div>
    </section>

    <HomeSection
      class="home__section"
      title="Characters"
      :amount-skeleton-card="amountCardPreview"
      :items="charactersFromAPI"
      :loading="loading.characters"
    />

    <HomeSection
      class="home__section"
      title="Locations"
      :amount-skeleton-card="amountCardPreview"
      :items="locationsFromAPI"
      :loading="loading.locations"
    />

    <HomeSection
      class="home__section"
      title="Episodes"
      :amount-skeleton-card="amountCardPreview"
      :items="episodesFromAPI"
      :loading="loading.episodes"
    />
  </div>
</main>
</template>

<script>
import urls from '../constants';
import HomeSection from '../layouts/HomeSection.vue';
import SpeechBubble from '../components/SpeechBubble.vue';
import characters from '../fakeData/characters.js';
import locations from '../fakeData/locations';
import episodes from '../fakeData/episodes';

const axios = require('axios').default;

export default {
  name: 'HomePage',
  components: {
    SpeechBubble,
    HomeSection,
  },

  data() {
    return {
      urls,
      characters,
      locations,
      episodes,
      charactersFromAPI: [],
      episodesFromAPI: [],
      locationsFromAPI: [],
      loading: {
        characters: false,
        locations: false,
        episodes: false,
      },
      amountCardPreview: 6,
      test: [],
    };
  },

  mounted() {
    this.getHomePageData();
    this.generateArrayRandomNumbers(671);
  },

  // TODO сделать всю эту хуйню
  methods: {
    getHomePageData() {
      // Реализовать три запроса через Promise.all

      //Promise.all([
        this.getData('url', 'character')

        this.getData('url', 'episode')

        this.getData('url', 'location')
      //])
        //.then((res) => console.log(res))
        //.catch((e) => console.log('error', e));
    },

    // eslint-disable-next-line no-unused-vars
    async getData(url, type) {
      // Функция принимает url запроса и тип (characters, location, episodes)
      // В запросе нужно сформировать массив с id и этот массив передавать в запрос
      let idArray = [];

      if (type === 'character') {
        idArray = this.generateArrayRandomNumbers(671);
      } else if (type === 'location') {
        idArray = this.generateArrayRandomNumbers(108);
      } else if (type === 'episode') {
        idArray = this.generateArrayRandomNumbers(41);
      }

      console.log(idArray, 'idArray');

      let promise = await fetch(`https://rickandmortyapi.com/api/${type}/${idArray}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Not 2xx response');
          }
          return response.json();
        })
        .then((results) => {


          if (type === 'character') {
            results.forEach((element) => this.charactersFromAPI.push(element));
          } else if (type === 'location') {
            results.forEach((element) => this.locationsFromAPI.push(element));
          } else if (type === 'episode') {
            results.forEach((element) => this.episodesFromAPI.push(element));
          }

          return results;
        })
        .catch((e) => console.log('error', e));

      return promise;
    },

    // eslint-disable-next-line no-unused-vars
    generateArrayRandomNumbers(maxIndex) {
      // Функция которая генерирует массив со случайными id
      const generatedRandomIdsArray = [];

      for (let i = 0; i <= this.amountCardPreview - 1; i++) {
        generatedRandomIdsArray.push(this.generateRandomNumber(maxIndex));
      }
      //console.log(generatedRandomIdsArray, 'random ids');

      return generatedRandomIdsArray;
    },

    // eslint-disable-next-line no-unused-vars
    generateRandomNumber(maxIndex) {
      // функция которая генерирует случайное число от 1 до maxIndex
      return Math.floor(1 + Math.random() * (maxIndex + 1 - 1));
    },
  },
};
</script>

<style scoped lang="stylus">
.home
  flex-grow 1
  flex-shrink 0
  flex-basis auto

  &__hero
    display flex
    flex-direction column
    justify-content space-around
    height calc(100vh - 67px)
    +lt-sm()
      height auto

  &__greeting
    display flex
    flex-direction column
    align-items center
    +sm()
      margin-top 40px

  &__image
    display block
    width 30%
    height auto
    margin-top 30px
    +sm()
      width  50%
    +xs()
      width  60%

  &__info
    +sm()
      width 80%
      margin-top 30px
    +xs()
      margin-top 40px

  &__title
    font-size 65px

  &__description
    font-size 31px
    +xs()
      font-size 25px
    &:not(:first-of-type)
      margin-top 15px

  &__section
    margin-top 60px
</style>
