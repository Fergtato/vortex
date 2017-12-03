<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<!-- <div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div> -->

	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
				<!-- repeat for every movie -->
	        	<div v-for="movie in popularMoviesGrid.movies">

	        		<poster :type="type" :media="movie"></poster>

	        	</div>



	        </div>

	        <div class="uk-container uk-text-center uk-padding">
	        	<button @click="showMore" class="uk-button uk-button-primary">Show More</button>
	        </div>

	        <!-- <ul>
	          <li v-for="movie in movies">
	            <router-link :to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
	          </li>
	        </ul> -->

	        <!-- <pre>{{movies}}</pre> -->




	     	</div>
	    </div>

	</div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

import myMixins from '../mixins/mixins.js';

  export default {
    data() {
      return {
        apiUrl: '',
        type: 'movie',
        // showLoader: true
      }
    },
    computed: {
    	popularMoviesGrid() {
    		return this.$store.state.popularMoviesGrid;
    	}
    },
    methods: {
    	showMore() {
    		this.popularMoviesGrid.page++;
    		this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=136727d529c2b6275946c6442cee626d&page=' + this.popularMoviesGrid.page;

			axios.get(this.apiUrl)
				.then((response) => {
				

				for (var i = 0; i < response.data.results.length; i++) {
					this.$store.state.popularMoviesGrid.movies.push(response.data.results[i]);
				}
				

			});
    	}
    },
    created() {

	    if (this.popularMoviesGrid.page == 1 && this.popularMoviesGrid.movies.length == 0) {

		    this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=136727d529c2b6275946c6442cee626d&page=' + this.popularMoviesGrid.page;

		    axios.get(this.apiUrl)
		    .then((response) => {

		    	for (var i = 0; i < response.data.results.length; i++) {
					this.$store.state.popularMoviesGrid.movies.push(response.data.results[i]);
				}

		    });

		}


    },
    mixins: [myMixins]
  }
</script>