import Vue from 'vue';
import App from './App.vue';
import router from './router';

// eslint-disable-next-line import/no-unresolved
// import '@/assets/stylus/commonStyle.styl';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
