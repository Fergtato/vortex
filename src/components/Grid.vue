<template>	
<div>	
					
		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
        	<div v-for="movie in grid.movies">

        		<poster :type="type" :media="movie"></poster>

        	</div>

        </div>

        <div class="uk-container uk-text-center uk-padding">
        	<div v-if="showLoader" class="uk-margin-bottom">
        		<div uk-spinner></div>
        	</div>
        	<br>
	    	<button @click="showMore" class="uk-button uk-button-primary">Show More</button>
	    </div>

</div>


</template>

<script>
	import firebase from 'firebase';
	import axios from 'axios';
	import tmdb from '../mixins/tmdb.js';

	export default {
		mixins: [tmdb],
		props: ['type', 'cat'],
		data() {
			return {
				tmdbListUrl: '',
				showLoader: true
			}
		},
		computed: {
	    	grid() {
	    		if (this.cat === 'popular') {
	    			return this.$store.state.popularMoviesGrid;
	    		}
	    		else if (this.cat === 'top_rated') {
	    			return this.$store.state.topratedMoviesGrid;
	    		}
	    		else if (this.cat === 'upcoming') {
	    			return this.$store.state.upcomingMoviesGrid;
	    		}
	    		else if (this.cat === 'now_playing') {
	    			return this.$store.state.nowplayingMoviesGrid;
	    		}
	    		else if (this.cat === 'airing_today') {
	    			return this.$store.state.airingTodayTvGrid;
	    		}
	    		else if (this.cat === 'on_the_air') {
	    			return this.$store.state.airingTodayTvGrid;
	    		}
	    		
	    	}
	    },
	    methods: {
	    	showMore() {
	    		this.showLoader = true;
	    		this.grid.page++;
	    		this.tmdbListUrl = this.getTmdbListUrl(this.type, this.cat, this.grid.page);

				axios.get(this.tmdbListUrl)
					.then((response) => {

					console.log(response);
					this.$store.commit('appendToGrid', {response: response, grid: this.grid});
					this.showLoader = false;

				});
	    	}
    	},
	    created() {

		    if (this.grid.page == 1 && this.grid.movies.length == 0) {

			    this.tmdbListUrl = this.getTmdbListUrl(this.type, this.cat, this.grid.page);

			    axios.get(this.tmdbListUrl)
			    .then((response) => {

			    	this.$store.commit('appendToGrid', {response: response, grid: this.grid});
			    	this.showLoader = false;
			    });

			} else {
				this.showLoader = false;
			}

    	}
	}
</script>