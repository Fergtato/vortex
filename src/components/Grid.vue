<template>	
<div>	

		
				
	<div v-if="cat == 'search'">
		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
			<div v-for="item in grid.items">

				<poster :type="item.media_type" :media="item" :showIcons="showPosterIcons"></poster>

			</div>
    	</div>
	</div>
	<div v-else>
		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
			<div v-for="item in grid.items">
				
				<poster v-if="type === 'person'" :type="type" :media="item" :showIcons="showPeoplePosterIcons"></poster>
				<poster v-else :type="type" :media="item" :showIcons="showPosterIcons"></poster>

			</div>
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
		props: ['type', 'cat', 'query'],
		data() {
			return {
				tmdbListUrl: '',
				showLoader: true,
				showPosterIcons: true,
				showPeoplePosterIcons: false
			}
		},
		computed: {
	    	grid() {
	    		if (this.cat === 'popular' && this.type === 'movie') {
	    			return this.$store.state.popularMoviesGrid;
	    		}
	    		else if (this.cat === 'top_rated' && this.type === 'movie') {
	    			return this.$store.state.topratedMoviesGrid;
	    		}
	    		else if (this.cat === 'upcoming' && this.type === 'movie') {
	    			return this.$store.state.upcomingMoviesGrid;
	    		}
	    		else if (this.cat === 'now_playing' && this.type === 'movie'){
	    			return this.$store.state.nowplayingMoviesGrid;
	    		}
	    		else if (this.cat === 'airing_today' && this.type === 'tv') {
	    			return this.$store.state.airingTodayTvGrid;
	    		}
	    		else if (this.cat === 'on_the_air' && this.type === 'tv') {
	    			return this.$store.state.onTheAirTvGrid;
	    		}
	    		else if (this.cat === 'popular' && this.type === 'tv') {
	    			return this.$store.state.popularTvGrid;
	    		}
	    		else if (this.cat === 'top_rated' && this.type === 'tv') {
	    			return this.$store.state.topRatedTvGrid;
	    		}
	    		else if (this.cat === 'latest' && this.type === 'person') {
	    			return this.$store.state.latestPeopleGrid;
	    		}
	    		else if (this.cat === 'popular' && this.type === 'person') {
	    			return this.$store.state.popularPeopleGrid;
	    		}
	    		else if (this.cat === 'search' && this.type === 'movie') {
	    			return this.$store.state.searchResultsGrid;
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
	    	},
	    	initialAppend() {

	    		if (this.cat === 'search') {
		    		this.tmdbListUrl = this.getSearchUrl(this.query, this.grid.page);
		    		this.$store.commit('clearSearch');
		    	} else {
			    	this.tmdbListUrl = this.getTmdbListUrl(this.type, this.cat, this.grid.page);
			    }

			    axios.get(this.tmdbListUrl)
			    .then((response) => {

			    	this.$store.commit('appendToGrid', {response: response, grid: this.grid});
			    	this.showLoader = false;
			    });

	    	}
    	},
	    created() {

		    if (this.grid.page == 1 && this.grid.items.length == 0) {

		    	this.initialAppend();

			} else {
				this.showLoader = false;
			}

    	},
    	watch: {
	      '$route' (to, from) {

	       	this.initialAppend();

	      }
	    }
	}
</script>