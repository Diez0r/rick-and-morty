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


  methods: {
    //  нужно два запроса
  },
};
</script>
