<template>
<main class="location df mba">
  <DetailedInfo
    :detailed-data="locationData"
    :items="characters"
    :loading="loading"
  />
</main>
</template>

<script>
import urls from '../../constants';
import DetailedInfo from '../../layouts/Detailed.vue';

export default {
  name: 'LocationPage',

  components: {
    DetailedInfo,
  },

  data() {
    return {
      urls,
      episodeId: 1, // Нужно дополнить, что бы при загрузке уже была инфа
      locationData: {},
      characterIds: [],
      characters: [],
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  async mounted() {
    const locationId = this.$route.params.id;

    const responseLocation = await fetch(`https://rickandmortyapi.com/api/location/${locationId}`);
    const resultLocation = await responseLocation.json();

    if (responseLocation.ok) {
      this.loading.data = false;
      this.locationData = resultLocation;
    }

    const responseCharacters = await fetch('https://rickandmortyapi.com/api/character/');
    const charactersToJSON = await responseCharacters.json();

    const result = charactersToJSON.results;

    const charactersForCurrentLocation = result.filter((item) => item.origin.url.includes(`https://rickandmortyapi.com/api/location/${locationId}`));

    if (responseCharacters.ok) {
      this.loading.additionalContent = false;
      this.characters = charactersForCurrentLocation;
    }
  },

  methods: {
    //  нужно два запроса
  },
};
</script>
