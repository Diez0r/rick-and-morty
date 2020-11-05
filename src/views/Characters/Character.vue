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
    await this.getCharacterInfoFromAPI();
    await this.getInfoAboutThisCharacterEpisodes();
  },

  methods: {
    async getCharacterInfoFromAPI() {
      this.characterId = this.$route.params.id;

      const responseCharacter = await fetch(`https://rickandmortyapi.com/api/character/${this.characterId}`);
      const resultCharacter = await responseCharacter.json();

      if (responseCharacter.ok) {
        this.loading.data = false;
        this.characterData = resultCharacter;
      }
    },

    // TODO если 1 эпизод, то он приходит в виде объекта, завис на этой хуйне жестко

    async getInfoAboutThisCharacterEpisodes() {
      const episodesIdArray = [];
      this.characterData.episode.forEach((item) => episodesIdArray.push(item.substr(40)));

      const episodesIdToString = episodesIdArray.join(',');

      const responseEpisodes = await fetch(`https://rickandmortyapi.com/api/episode/${episodesIdToString}`);
      const episodesToJSON = await responseEpisodes.json();

      if (responseEpisodes.ok) {
        this.loading.additionalContent = false;
        this.episodes = episodesToJSON;
      }
    },
  },
};
</script>
