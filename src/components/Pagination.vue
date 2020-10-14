<template>
<div
  v-if="quantityPages => 2"
  class="pagination"
>
  <div
    v-if="currentPage < quantityPages"
    class="pagination__load-more"
  >
    <SkewButton
      :color="colorForButton"
      :loading="loading"
      text="load more"
      @click="handleLoadMore"
    />
  </div>

  <div class="pagination__inner">
    <SkewButton
      v-if="withPreviousAndNextButton && quantityPages > 5"
      class="pagination__extreme-btn"
      text="prev"
      :color="colorForButton"
      :disabled="loading"
      :class="{ 'disabled' : currentPage <= 1 }"
      @click="handleClick(currentPage - 1)"
    />
    <div
      v-if="pageList && pageList.length && !(quantityVisiblePages <= 5)"
      class="pagination__list"
    >
      <SkewButton
        v-for="(page, index) in pageList"
        :key="index"
        :color="colorForButton"
        :text="page"
        :disabled="loading"
        type="pagination"
        class="pagination__count"
        :class="[
          { 'disabled' : page === '...' || page === currentPage },
          { 'active' : Number(currentPage) === page },
          offsetDirection,
        ]"
        @click="handleClick(page)"
      />
    </div>
    <SkewButton
      v-if="withPreviousAndNextButton && quantityPages > 5"
      class="pagination__extreme-btn"
      text="next"
      :disabled="loading"
      :class="{ 'disabled' : currentPage >= quantityPages }"
      @click="handleClick(currentPage + 1)"
    />
  </div>
</div>
</template>

<script>
import SkewButton from './buttons/skew/SkewButton.vue';

export default {
  name: 'Pagination',

  components: {
    SkewButton,
  },

  props: {
    colorForButton: {
      type: String,
      default: 'blue',
    },

    currentPage: {
      type: [Number, String],
      default: 1,
    },

    quantityPages: {
      type: Number,
      default: 1,
    },

    quantityVisiblePages: {
      type: Number,
      default: 1,
    },

    withPreviousAndNextButton: {
      type: Boolean,
      default: true,
    },

    loading: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      pageList: [],
      offsetDirection: null,
    };
  },

  watch: {
    currentPage(newPage, oldPage) {
      if (this.quantityPages > 5) {
        if (newPage > oldPage) this.offsetDirection = 'offset-left';
        else this.offsetDirection = 'offset-right';
      }

      this.pageList = this.createPageList(this.quantityPages);

      setTimeout(() => {
        this.offsetDirection = null;
      }, 500);
    },

    quantityPages() {
      this.pageList = this.createPageList(this.quantityPages);
    },
  },

  mounted() {
    this.pageList = this.createPageList(this.quantityPages);
  },

  methods: {
    createPageList() {
      let pageList = [];

      if (this.quantityPages <= 5) {
        pageList = this.fillArrayIteratorNumbers(this.quantityPages);
        return pageList;
      }

      const maxPageValueForUpdatePageList = this.quantityPages - 4;

      const currentPage = Number(this.currentPage);
      const quantityPages = Number(this.quantityPages);

      if (currentPage >= maxPageValueForUpdatePageList) {
        pageList = this.fillArrayIteratorNumbers(quantityPages, 5);
      } else {
        pageList.push(currentPage, currentPage + 1, currentPage + 2, currentPage + 3);
        pageList.push('...');
        pageList.push(quantityPages);
      }

      return pageList;
    },

    fillArrayIteratorNumbers(maxNum, fromEndIndex) {
      let fillingArray = [];

      fillingArray = Array.from(Array(maxNum).keys());
      fillingArray = fillingArray.map((index) => index + 1);

      if (fromEndIndex) {
        const firstIndex = fillingArray.length - fromEndIndex;
        const lastIndex = fillingArray.length - 1;
        fillingArray = fillingArray.splice(firstIndex, lastIndex);
      }

      return fillingArray;
    },

    handleClick(page) {
      this.$emit('page-change', page);
    },

    handleLoadMore() {
      this.$emit('load-more');
    },
  },
};
</script>

<style scoped lang="stylus">
.pagination
  display flex
  flex-direction column
  align-items center

  &__inner
    display flex
    +xs()
      display none

    .pagination__load-more + &
      margin-top 25px

  &__list
    display flex

  &__count
    width 70px
    +sm()
      width 50px
      height 40px
    & + &
      margin-left 0

  &__extreme-btn
    +sm()
      min-width 70px
      height 40px


.offset-right
  /deep/ .skew-button__text
    animation offset-right 0.3s ease-in-out

.offset-left
  /deep/ .skew-button__text
    animation offset-left 0.3s ease-in-out

@keyframes offset-right
  0% {
    transform translateX(0)
  }
  100% {
    transform translateX(100px)
  }

@keyframes offset-left
  0% {
    transform translateX(100px)
  }
  100% {
    transform translateX(0)
  }
</style>
