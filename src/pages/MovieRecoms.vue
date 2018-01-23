<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{movie.title}} Recommendations</h3>
				<pre>{{recommendations}}</pre>


	     	</div>
	    </div>

	</div>
</template>



<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../mixins/tmdb.js';

  export default {
  	mixins: [tmdb],
    data() {
      return {
      	title: 'Recommendations - Vortex',
      	tmdbMovieUrl: '',
        tmdbMovieRecomsUrl: '',
        movie: {},
        recommendations: {}
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