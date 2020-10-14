import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Characters from '../views/Characters/Characters.vue';
import Character from '../views/Characters/Character.vue';
import Episodes from '../views/Episodes/Episodes.vue';
import Episode from '../views/Episodes/Episode.vue';
import Locations from '../views/Locations/Locations.vue';
import Location from '../views/Locations/Location.vue';
import ErrorPage from '../views/ErrorPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/characters',
    name: 'Characters',
    component: Characters,
  },
  {
    path: '/characters/:id',
    name: 'Character',
    component: Character,
  },
  {
    path: '/episodes',
    name: 'Episodes',
    component: Episodes,
  },
  {
    path: '/episodes/:id',
    name: 'Episode',
    component: Episode,
  },
  {
    path: '/locations',
    name: 'Locations',
    component: Locations,
  },
  {
    path: '/locations/:id',
    name: 'Location',
    component: Location,
  },
  {
    path: '*',
    name: 'Error',
    component: ErrorPage,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
