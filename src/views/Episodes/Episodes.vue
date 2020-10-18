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

export default {
  name: 'Episodes',

  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      episodesFromAPI: [],
      pagination: {},
      loading: {
        firstLoading: true,
        newPage: false,
        moreItems: false,
      },
      addMoreEpisodes: false,
      paramsToSting: '',
      currentPage: null,
    };
  },

  async mounted() {
    const responseEpisodes = await fetch('https://rickandmortyapi.com/api/episode/');
    const episodesToJSON = await responseEpisodes.json();

    const resolvedInfo = await episodesToJSON.info;
    const resolvedEpisodes = await episodesToJSON.results;

    this.pagination = resolvedInfo;

    if (!resolvedInfo.prev) {
      this.currentPage = 1;
    } else if (resolvedInfo.prev < 9) {
      this.currentPage = resolvedInfo.next.toString().slice(-1);
    } else {
      this.currentPage = resolvedInfo.next.toString().slice(-2);
    }

    if (responseEpisodes.ok) {
      resolvedEpisodes.forEach((item) => {
        this.episodesFromAPI.push(item);
      });
    }
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
