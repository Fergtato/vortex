import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import User from './pages/User.vue';

import MyLists from './pages/MyLists.vue';

import Movie from './pages/movies/Movie.vue';
import MovieCast from './pages/movies/MovieCast.vue';
import MovieRecoms from './pages/movies/MovieRecoms.vue';

import PopularMovies from './pages/movies/PopularMovies.vue';
import TopratedMovies from './pages/movies/TopratedMovies.vue';
import UpcomingMovies from './pages/movies/UpcomingMovies.vue';
import NowplayingMovies from './pages/movies/NowplayingMovies.vue';

import TvShow from './pages/tv/TvShow.vue';

import AiringTv from './pages/tv/AiringTv.vue';
import OnAirTv from './pages/tv/OnAirTv.vue';
import PopularTv from './pages/tv/PopularTv.vue';
import TopRatedTv from './pages/tv/TopRatedTv.vue';

import PopularPeople from './pages/people/PopularPeople.vue';

import Elements from './pages/Elements.vue';

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/signup', component: Signup },
    { path: '/user', component: User },
    { path: '/mylists', component: MyLists },
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