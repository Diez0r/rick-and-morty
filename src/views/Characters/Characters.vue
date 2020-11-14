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

export default {
  name: 'CharactersPage',

  components: {
    Catalog,
  },

  data() {
    return {
      urls,
      charactersFromAPI: [],
      pagination: {},
      currentPage: this.$route.query.page || 1, // Нужно дополнить, что бы при загрузке уже была инфа
      addMoreCharacters: false,
      paramsToString: '',
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

  watch: {
    '$route.query': function () {
      if (!this.$route.query.page) {
        this.fillChosenFiltersFromQuery();
      }
    },
  },

  mounted() {
    if (this.$route.query.name || this.$route.query.status || this.$route.query.species || this.$route.query.gender) {
      this.fillChosenFiltersFromQuery();
      console.log('filter');
      return;
    }

    if (!this.$route.query.length || this.$route.query.page) {
      this.loadCharacters(this.currentPage);
      console.log('page');
    }

    // TODO условия для загрузки страницы продумать
  },

  methods: {
    // fetch https://learn.javascript.ru/fetch
    //  https://learn.javascript.ru/async
    // TODO переделать запросы на промисах
    // пагинация - подставляем в роут и в запрос номер страницы +
    // loadMore - берем массив персонажей с текущей страницы и добавляем к нему массив со следющей страницы
    // watch на квери
    // на главной - Promise All с случайными персонажами, эпизодами, локациями


    loadCharacters(currentPage) {
      let page = currentPage;

      if (this.addMoreCharacters) {
        page = currentPage + 1;
      }

      const promise = fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((results) => {
          results.results.forEach((item) => this.charactersFromAPI.push(item));

          this.pagination = results.info;

          if (this.addMoreCharacters) {
            this.currentPage = currentPage + 1;

            const query = {
              page: currentPage + 1,
            };

            this.$router.push({ query });
            console.log('load more', page);
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

    updateCharacters(queryString) {
      console.log('1111', queryString);
      const promise = fetch(`https://rickandmortyapi.com/api/character/${queryString}`)
        .then((response) => {
          if (!response.ok) throw new Error('Not 2xx response');
          return response.json();
        })
        .then((results) => {
          this.charactersFromAPI = [];
          results.results.forEach((item) => this.charactersFromAPI.push(item));

          this.pagination = results.info;
        })
        .catch((e) => console.log('error', e));
    },

    updateParams({ value, paramsName }) {
      const query = {};

      if (this.params[paramsName] !== value) {
        this.params[paramsName] = value;
        console.log('true');
      } else {
        this.params[paramsName] = '';
        console.log('false');

        query.page = this.currentPage;

        this.$router.push({ query });

        this.pageChange(this.currentPage);
      }

      Object.entries(this.params).forEach(([filterName, filterValue]) => {
        if (filterValue.length > 0) {
          query[filterName] = filterValue;
        }
      });

      this.$router.push({ query });
    },

    pageChange(currentPage) {
      this.charactersFromAPI = [];

      const query = {};
      query.page = currentPage;

      this.$router.push({ query });
      this.loadCharacters(Number(currentPage));
    },

    loadMoreCharacters() {
      this.addMoreCharacters = true;
      this.loadCharacters(Number(this.currentPage));
    },

    resetFilters() {
      this.params = {
        name: '',
        status: '',
        species: '',
        gender: '',
      };

      const query = this.params;

      this.$router.push({ query });
    },

    fillChosenFiltersFromQuery() {
      let queryString = '';
      Object.entries(this.$route.query).forEach((item) => {
        const substring = item.join('=');

        if (queryString.length > 0) {
          queryString += `&${substring}`;
        } else {
          queryString = `?${substring}`;
        }
      });

      this.updateCharacters(queryString);
    },
  },
};
</script>
