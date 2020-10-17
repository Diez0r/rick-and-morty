<template>
<main class="characters mba">

  <Catalog
    :loading="loading"
    :filters="filters"
    :params="params"
    :items="charactersFromAPI"
    :current-page="currentPage"
    :pagination-data="pagination"
    @update-filters="updateParams($event)"
    @page-change="pageChange"
    @load-more="loadMoreCharacters"
    @reset-filters="resetFilters"
  />
</main>
</template>

<script>
import urls from '../../constants';
import Catalog from '../../layouts/Catalog.vue';
import characters from '../../fakeData/characters';

export default {
  name: 'CharactersPage',

  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      //characters,
      charactersFromAPI: [],
      pagination: {},
      currentPage: 1, // Нужно дополнить, что бы при загрузке уже была инфа
      addMoreCharacters: false,
      paramsToSting: '',
      params: {
        name: '', // Нужно дополнить, что бы при загрузке уже была инфа
        status: '', // Нужно дополнить, что бы при загрузке уже была инфа
        species: '', // Нужно дополнить, что бы при загрузке уже была инфа
        gender: '', // Нужно дополнить, что бы при загрузке уже была инфа
      },
      loading: {
        firstLoading: true,
        newPage: false,
        moreItems: false,
      },
      filters: [
        {
          title: 'name',
          items: ['rick', 'morty', 'summer', 'beth', 'jerry'],
        },
        {
          title: 'status',
          items: ['alive', 'dead', 'unknown'],
        },
        {
          title: 'gender',
          items: ['female', 'male', 'genderless', 'unknown'],
        },
        {
          title: 'species',
          items: ['human', 'alien', 'humanoid', 'unknown'],
        },
      ],
    };
  },

  async mounted() {
    const response = await fetch('https://rickandmortyapi.com/api/character/');
    const result = await response.json();

    const resolvedCharacters = await result.results;

    resolvedCharacters.forEach((item) => {
      this.charactersFromAPI.push(item);
    });
  },

  methods: {
    // fentch https://learn.javascript.ru/fetch
    //  https://learn.javascript.ru/async
    updateParams() {

    },

    pageChange() {

    },

    loadMoreCharacters() {

    },

    resetFilters() {

    },
  },
};
</script>
