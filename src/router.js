import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import User from './pages/User.vue';

import Movie from './pages/Movie.vue';
import MovieCast from './pages/MovieCast.vue';
import MovieRecoms from './pages/MovieRecoms.vue';

import PopularMovies from './pages/PopularMovies.vue';
import TopratedMovies from './pages/TopratedMovies.vue';
import UpcomingMovies from './pages/UpcomingMovies.vue';
import NowplayingMovies from './pages/NowplayingMovies.vue';

import TvShow from './pages/TvShow.vue';

import AiringTv from './pages/AiringTv.vue';
import OnAirTv from './pages/OnAirTv.vue';
import PopularTv from './pages/PopularTv.vue';
import TopRatedTv from './pages/TopRatedTv.vue';

import LatestPeople from './pages/LatestPeople.vue';
import PopularPeople from './pages/PopularPeople.vue';

import Elements from './pages/Elements.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/user', component: User },
    { path: '/movies/popular', component: PopularMovies },
    { path: '/movies/toprated', component: TopratedMovies },
    { path: '/movies/upcoming', component: UpcomingMovies },
    { path: '/movies/nowplaying', component: NowplayingMovies },
    { path: '/movies/:movieId', component: Movie},
    { path: '/movies/:movieId/cast', component: MovieCast},
    { path: '/movies/:movieId/recommendations', component: MovieRecoms},
    { path: '/tvshows/airing_today', component: AiringTv },
    { path: '/tvshows/popular', component: PopularTv },
    { path: '/tvshows/on_the_air', component: OnAirTv },
    { path: '/tvshows/top_rated', component: TopRatedTv },
    { path: '/tvshows/:tvShowId', component: TvShow},
    { path: '/person/latest', component: LatestPeople},
    { path: '/person/popular', component: PopularPeople},
    { path: '/test', component: Elements }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
});

export default router;