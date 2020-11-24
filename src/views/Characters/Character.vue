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
      fetch(`https://rickandmortyapi.com/api/character/${this.characterId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((result) => {
          this.loading.data = false;
          this.characterData = result;

          return result.episode.map((item) => item.substring(40));
        })
        .then((episodes) => {
          this.episodesIdToString = episodes.join(',');
          return episodes.join(',');
        })
        .then((ep) => fetch(`https://rickandmortyapi.com/api/episode/${ep}`))
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
