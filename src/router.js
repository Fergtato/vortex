import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import User from './pages/User.vue';

import Movie from './pages/Movie.vue';
import PopularMovies from './pages/PopularMovies.vue';

import Elements from './pages/Elements.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/user', component: User },
    { path: '/movies/popular', component: PopularMovies },
    { path: '/movies/:movieId', component: Movie },
    { path: '/test', component: Elements }
  ]
});

export default router;