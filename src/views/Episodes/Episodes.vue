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
      currentPage: this.$route.query.page || 1,
    };
  },

  mounted() {
    this.loadEpisodes(this.currentPage);
  },

  methods: {
    loadEpisodes(currentPage) {
      let page = currentPage;

      if (this.addMoreEpisodes) {
        page = currentPage + 1;
      }

      fetch(`https://rickandmortyapi.com/api/episode/?page=${page}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((results) => {
          results.results.forEach((item) => this.episodesFromAPI.push(item));

          this.pagination = results.info;

          if (this.addMoreEpisodes) {
            this.currentPage = currentPage + 1;
          } else {
            this.currentPage = currentPage;

            const query = {
              page: currentPage,
            };

            this.$router.push({ query });
          }
        })
        .catch((e) => console.log('error', e));
    },

    pageChange(currentPage) {
      const page = currentPage;

      this.episodesFromAPI = [];

      this.loading.firstLoading = false;
      this.loadEpisodes(currentPage);
    },

    loadMoreEpisodes() {
      this.addMoreEpisodes = true;
      this.loadEpisodes(Number(this.currentPage));
    },
  },
};
</script>
