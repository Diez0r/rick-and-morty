<template>
<main class="episodes mba">
  <Catalog
    title="Episodes"
    :loading="loading"
    :items="episodesFromAPI"
    :current-page="currentPage"
    :pagination-data="pagination"
    @page-change="pageChange"
    @load-more="loadMoreEpisodes"
  />
</main>
</template>

<script>
import Catalog from '../../layouts/Catalog.vue';
import urls from '../../constants';
import episodes from '../../fakeData/episodes';

export default {
  name: 'Episodes',

  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      //episodes,
      episodesFromAPI: [],
      pagination: {},
      loading: {
        firstLoading: true,
        newPage: false,
        moreItems: false,
      },
      addMoreEpisodes: false,
      paramsToSting: '',
      currentPage: 1,
    };
  },

  async mounted() {
    const response = await fetch('https://rickandmortyapi.com/api/episode/');
    const result = await response.json();

    const resolvedEpisodes = await result.results;

    resolvedEpisodes.forEach((item) => {
      this.episodesFromAPI.push(item);
    });
  },

  methods: {
    updateParams() {

    },

    pageChange() {

    },

    loadMoreEpisodes() {

    },

    resetFilters() {

    },
  },
};
</script>
