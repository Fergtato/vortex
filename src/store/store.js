import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		siteTitle: 'Vortex Movie & TV Database',
		popularMoviesGrid: {
			page: 1,
			movies: []
		},
		topratedMoviesGrid: {
			page: 1,
			movies: []
		}
	},
	mutations: {
		addToGrid(state, payload) {

			for (var i = 0; i < payload.response.data.results.length; i++) {
				payload.grid.movies.push(payload.response.data.results[i]);
			}

		}
	}
});