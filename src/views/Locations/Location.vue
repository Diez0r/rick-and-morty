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

const axios = require('axios').default;

export default {
  name: 'LocationPage',

  components: {
    DetailedInfo,
  },

  data() {
    return {
      urls,
      locationId: this.$route.params.id, // Нужно дополнить, что бы при загрузке уже была инфа
      locationData: {},
      characterIds: [],
      characters: [],
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  mounted() {
    this.getLocationDataFromAPI();
  },

  methods: {
    getLocationDataFromAPI() {
      axios.get(`https://rickandmortyapi.com/api/location/${this.locationId}`)
        .then((response) => {
          this.loading.data = false;
          this.locationData = response.data;
          return response.data.residents.map((item) => item.substring(42));
        })
        .catch((e) => {
          throw new Error(e, 'Not 2xx response');
        })
        .then((residents) => axios.get(`https://rickandmortyapi.com/api/character/${residents}`))
        .then((result) => {
          console.log(result.data);
          this.loading.additionalContent = false;
          if (result.data.length) {
            this.characters = result.data;
          } else {
            this.characters.push(result.data);
          }
        })
        .catch((e) => {
          throw new Error(e, 'Not 2xx response');
        });
    },
  },
};
</script>
