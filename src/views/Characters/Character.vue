<template>
<main class="character df mba">
  <DetailedInfo
    :detailed-data="characterData"
    :items="episodes"
    :loading="loading"
  />
</main>
</template>

<script>
import urls from '../../constants';
import DetailedInfo from '../../layouts/Detailed.vue';

export default {
  name: 'CharacterPage',
  components: {
    DetailedInfo,
  },
  data() {
    return {
      urls,
      characterData: {
        links: [],
      },
      links: {
        origin: {},
        location: {},
      },
      episodesIds: [],
      episodesIdToString: '',
      episodes: [],
      characterId: this.$route.params.id, // Нужно дополнить, что бы при загрузке уже была инфа
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  mounted() {
    this.getCharacterInfoFromAPI();
  },

  methods: {
    getCharacterInfoFromAPI() {
      const responseCharacter = fetch(`https://rickandmortyapi.com/api/character/${this.characterId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((result) => {
          this.loading.data = false;
          this.characterData = result;

          this.episodesIdArrayToString();
        });
    },

    episodesIdArrayToString() {
      const episodesIdArray = [];
      this.characterData.episode.forEach((item) => episodesIdArray.push(item.substr(40)));

      this.episodesIdToString = episodesIdArray.join(',');

      this.getInfoAboutThisCharacterEpisodes();
    },

    getInfoAboutThisCharacterEpisodes() {
      const responseEpisodes = fetch(`https://rickandmortyapi.com/api/episode/${this.episodesIdToString}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((result) => {
          this.loading.additionalContent = false;

          if (result.length) {
            this.episodes = result;
          } else {
            this.episodes.push(result);
          }
        });
    },
  },
};
</script>
