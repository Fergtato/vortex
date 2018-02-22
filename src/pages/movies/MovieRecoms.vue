<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{movie.title}} - Recommendations</h3>
	     		
	     		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>

		     		<div v-for="movie in recommendations">

	                	<poster :type="posterType" :media="movie"></poster>

	             	</div>

            	</div>


	     	</div>
	    </div>

	</div>
</template>



<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../../mixins/tmdb.js';

  export default {
  	mixins: [tmdb],
    data() {
      return {
      	title: 'Recommendations - Vortex',
      	tmdbMovieUrl: '',
        tmdbMovieRecomsUrl: '',
        movie: {},
        recommendations: {},
        posterType: 'movie'
      }
    },
    methods: {
    	setUrls(movieId) {
    		this.tmdbMovieUrl = this.getTmdbMovieUrl(movieId);
    		this.tmdbMovieRecomsUrl = this.getTmdbMovieRecomsUrl(movieId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbMovieUrl)
			.then((response) => {
				this.movie = response.data;
				this.title = this.movie.title + ' - Vortex';
			});

	        axios.get(this.tmdbMovieRecomsUrl)
	        .then((response) => {
	        	this.recommendations = response.data.results;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.setUrls(to.params.movieId);
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls(this.$route.params.movieId);
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>