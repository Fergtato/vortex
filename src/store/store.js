import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
	state: {
		testVar: 'Hello2',
		popularMoviesGrid: {
			page: 1,
			movies: []
		}
	}
});