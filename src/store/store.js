import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		siteTitle: 'Vortex Movie & TV Database',
		searchResultsGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		popularMoviesGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		topratedMoviesGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		upcomingMoviesGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		nowplayingMoviesGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		airingTodayTvGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		onTheAirTvGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		popularTvGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		topRatedTvGrid: {
			page: 1,
			total_pages: 0,
			items: []
		},
		popularPeopleGrid: {
			page: 1,
			total_pages: 0,
			items: []
		}
	},
	mutations: {
		appendToGrid(state, payload) {

			for (var i = 0; i < payload.response.data.results.length; i++) {
				payload.grid.items.push(payload.response.data.results[i]);
			}
			payload.grid.total_pages = payload.response.data.total_pages;

		},
		clearSearch(state) {
			state.searchResultsGrid.movies = [];
		}
	}
});