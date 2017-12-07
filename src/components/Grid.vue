<template>	
<div>	
					
		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
        	<div v-for="movie in grid.movies">

        		<poster :type="type" :media="movie"></poster>

        	</div>

        </div>

        <div class="uk-container uk-text-center uk-padding">
	    	<button @click="showMore" class="uk-button uk-button-primary">Show More</button>
	    </div>
</div>


</template>

<script>
	import firebase from 'firebase';
	import axios from 'axios';

	export default {
		props: ['type', 'cat'],
		data() {
			return {
				apiUrl: ''
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
	    		
	    	}
	    },
	    methods: {
	    	showMore() {
	    		this.grid.page++;
	    		this.apiUrl = 'https://api.themoviedb.org/3/' + this.type + '/' + this.cat + '?api_key=136727d529c2b6275946c6442cee626d&page=' + this.grid.page;

				axios.get(this.apiUrl)
					.then((response) => {

					// for (var i = 0; i < response.data.results.length; i++) {
					// 	this.$store.state.popularMoviesGrid.movies.push(response.data.results[i]);
					// }

					this.$store.commit('addToGrid', {response: response, grid: this.grid});

				});
	    	}
    	},
	    created() {

		    if (this.grid.page == 1 && this.grid.movies.length == 0) {

			    this.apiUrl = 'https://api.themoviedb.org/3/' + this.type + '/' + this.cat + '?api_key=136727d529c2b6275946c6442cee626d&page=' + this.grid.page;

			    axios.get(this.apiUrl)
			    .then((response) => {

			    	this.$store.commit('addToGrid', {response: response, grid: this.grid});

			    });

			}


    }
	}
</script>