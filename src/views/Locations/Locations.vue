<template>
<main class="locations mba">
  <Catalog
    title="Location"
    :loading="loading"
    :filters="filters"
    :params="params"
    :items="locationsFromAPI"
    :current-page="currentPage"
    :pagination-data="pagination"
    @update-filters="updateParams($event)"
    @page-change="pageChange"
    @load-more="loadMoreLocations"
    @reset-filters="resetFilters"
  />
</main>
</template>

<script>
import urls from '../../constants';
import Catalog from '../../layouts/Catalog.vue';
import locations from '../../fakeData/locations';

const axios = require('axios').default;

export default {
  name: 'LocationsPage',
  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      locations,
      locationsFromAPI: [],
      pagination: {},
      loading: {
        firstLoading: true,
        newPage: false,
        moreItems: false,
      },
      addMoreLocations: false,
      paramsToSting: '',
      currentPage: 1, // Нужно дополнить, что бы при загрузке уже была инфа
      params: {},
      filters: [
        {
          title: 'type',
          items: ['planet', 'cluster', 'resort'],
        },
        {
          title: 'dimension',
          items: ['C-137', 'Post-Apocalyptic', 'Cronenberg', 'unknown'],
        },
      ],
    };
  },

  mounted() {
    // TODO переделать запросы на Axios
    this.getLocationsFromAPI();
  },

  methods: {
    getLocationsFromAPI() {
      axios.get('https://rickandmortyapi.com/api/location/')
        .then((result) => {
          console.log(result);
          this.pagination = result.data.info;
          this.locationsFromAPI = result.data.results;
        })
    },

    updateParams() {

    },

    pageChange() {

    },

    loadMoreLocations() {

    },

    resetFilters() {
    },
  },
};
</script>
