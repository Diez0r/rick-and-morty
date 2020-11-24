<template>
<main class="episode df mba">
  <DetailedInfo
    :detailed-data="episodeData"
    :items="characters"
    :loading="loading"
  />
</main>
</template>

<script>
import urls from '../../constants';
import DetailedInfo from '../../layouts/Detailed.vue';

export default {
  name: 'EpisodePage',

  components: {
    DetailedInfo,
  },

  data() {
    return {
      urls,
      episodeId: this.$route.params.id,
      episodeData: {},
      characterIds: [],
      characters: [],
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  mounted() {
    // TODO переделать запросы на промисах
    this.getEpisodeDataFromAPI();
  },

  methods: {
    getEpisodeDataFromAPI() {
      fetch(`https://rickandmortyapi.com/api/episode/${this.episodeId}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((result) => {
          this.loading.data = false;
          this.episodeData = result;

          return result.characters.map((item) => item.substring(42));
        })
        .then((char) => fetch(`https://rickandmortyapi.com/api/character/${char}`))
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((result) => {
          this.loading.additionalContent = false;
          this.characters = result;
        });
    },
  },
};
</script>
