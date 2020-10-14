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
      episodeId: 1, // Нужно дополнить, что бы при загрузке уже была инфа
      episodeData: {},
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
