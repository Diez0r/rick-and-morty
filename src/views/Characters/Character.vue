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
      characterId: 1, // Нужно дополнить, что бы при загрузке уже была инфа
      loading: {
        data: true,
        additionalContent: true,
      },
    };
  },

  methods: {
    //  нужны два запроса
    //  первый - возвращет информацию о персонаже
    //  второй - из полученных данных о персанаже нужно взять эпизод, и  запросить информацию о эпизоде
  },
};
</script>
