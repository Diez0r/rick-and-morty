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
      episodes: [],
      characterId: null, // Нужно дополнить, что бы при загрузке уже была инфа
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  async mounted() {
    this.characterId = this.$route.params.id;

    const responseCharacter = await fetch(`https://rickandmortyapi.com/api/character/${this.characterId}`);
    const resultCharacter = await responseCharacter.json();

    if (responseCharacter.ok) {
      this.loading.data = false;
      this.characterData = resultCharacter;
    }

    const responseEpisodes = await fetch('https://rickandmortyapi.com/api/episode/');
    const episodesToJSON = await responseEpisodes.json();

    const result = episodesToJSON.results;
    const episodesForCurrentCharacter = result.filter((item) => item.characters.includes(`https://rickandmortyapi.com/api/character/${this.characterId}`));

    if (responseEpisodes.ok) {
      this.loading.additionalContent = false;
      this.episodes = episodesForCurrentCharacter;
    }
  },

  methods: {
    //  нужны два запроса
    //  первый - возвращет информацию о персонаже
    //  второй - из полученных данных о персанаже нужно взять эпизод, и  запросить информацию о эпизоде
  },
};
</script>
