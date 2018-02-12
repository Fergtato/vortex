import VueRouter from 'vue-router';

import Home from './pages/Home.vue';
import Login from './pages/Login.vue';
import Signup from './pages/Signup.vue';
import User from './pages/User.vue';
import SearchResults from './pages/SearchResults.vue';

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

import Person from './pages/people/Person.vue';
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
    { path: '/search/:query', component: SearchResults },
    { path: '/movie/popular', component: PopularMovies },
    { path: '/movie/toprated', component: TopratedMovies },
    { path: '/movie/upcoming', component: UpcomingMovies },
    { path: '/movie/nowplaying', component: NowplayingMovies },
    { path: '/movie/:movieId', component: Movie},
    { path: '/movie/:movieId/cast', component: MovieCast},
    { path: '/movie/:movieId/recommendations', component: MovieRecoms},
    { path: '/tv/airing_today', component: AiringTv },
    { path: '/tv/popular', component: PopularTv },
    { path: '/tv/on_the_air', component: OnAirTv },
    { path: '/tv/top_rated', component: TopRatedTv },
    { path: '/tv/:tvShowId', component: TvShow},
    { path: '/person/popular', component: PopularPeople},
    { path: '/person/:personId', component: TvShow},
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