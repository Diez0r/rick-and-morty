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

  mounted() {
    this.loadCharacters(this.currentPage);
  },

  watch: {
    '$route.query': function () {
      //this.fillChosenFilters();

      console.log(111)
    },
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

    updateParams({ value, paramsName }) {
      console.log(paramsName, value);

      this.$route.query[paramsName] = value;
      console.log('true');

      // if (this.params[paramsName] !== value) {
      //   this.params[paramsName] = value;
      //   console.log('true');
      // } else {
      //   this.params[paramsName] = '';
      //   console.log('false');
      // }
      //
      // let query = this.params;
      //
      // this.$router.push({ query });

      // поиск осуществляется на бэке, глянуть доку по API там есть запрос
    },

    fillChosenFilters() {
      for (const filterType in this.params) {
        if (this.$route.query[filterType]) {
          this.params[filterType] = this.$route.query[filterType];
        } else {
          this.params[filterType] = '';
        }
      }
    },

    pageChange(currentPage) {
      this.charactersFromAPI = [];

      const query = {
        page: currentPage,
      };

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

      let query = this.params;

      this.$router.push({ query })
    },
  },
};
</script>
