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
      episodeId: null, // Нужно дополнить, что бы при загрузке уже была инфа
      episodeData: {},
      characterIds: [],
      characters: [],
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  async mounted() {
    this.episodeId = this.$route.params.id;

    const responseEpisode = await fetch(`https://rickandmortyapi.com/api/episode/${this.episodeId}`);
    const resultEpisodeToJSON = await responseEpisode.json();

    if (responseEpisode.ok) {
      this.loading.data = false;
      this.episodeData = resultEpisodeToJSON;
    }

    const responseCharacters = await fetch('https://rickandmortyapi.com/api/character/');
    const charactersToJSON = await responseCharacters.json();

    const result = charactersToJSON.results;
    const characterForCurrentEpisodes = result.filter((item) => item.episode.includes(`https://rickandmortyapi.com/api/episode/${this.episodeId}`));

    if (responseCharacters.ok) {
      this.loading.additionalContent = false;
      this.characters = characterForCurrentEpisodes;
    }
  },

  methods: {
    //  нужно два запроса
  },
};
</script>
