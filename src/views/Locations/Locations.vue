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

export default {
  name: 'LocationsPage',
  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      //locations,
      locationsFromAPI : [],
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

  async mounted() {
    // TODO переделать запросы на Axios
    const responseLocations = await fetch('https://rickandmortyapi.com/api/location/');
    const locationsToJSON = await responseLocations.json();

    const resolvedInfo = await locationsToJSON.info;
    const resolvedLocations = await locationsToJSON.results;

    this.pagination = resolvedInfo;

    if (!resolvedInfo.prev) {
      this.currentPage = 1;
    } else if (resolvedInfo.prev < 9) {
      this.currentPage = resolvedInfo.next.toString().slice(-1);
    } else {
      this.currentPage = resolvedInfo.next.toString().slice(-2);
    }

    if (responseLocations.ok) {
      resolvedLocations.forEach((item) => this.locationsFromAPI.push(item));
    }
  },

  methods: {
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
