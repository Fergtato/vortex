import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		siteTitle: 'Vortex Movie & TV Database',
		popularMoviesGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		topratedMoviesGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		upcomingMoviesGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		nowplayingMoviesGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		airingTodayTvGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		onTheAirTvGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		popularTvGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		topRatedTvGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		latestPeopleGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		},
		popularPeopleGrid: {
			page: 1,
			total_pages: 0,
			movies: []
		}
	},
	mutations: {
		appendToGrid(state, payload) {

			for (var i = 0; i < payload.response.data.results.length; i++) {
				payload.grid.movies.push(payload.response.data.results[i]);
			}
			payload.grid.total_pages = payload.response.data.total_pages;
			console.log(payload.response.data);

		}
	}
});