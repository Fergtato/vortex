<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{movie.title}} Cast</h3>
				<pre>{{cast}}</pre>
				<h3>Crew</h3>
				<pre>{{crew}}</pre>


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
      	title: 'Cast - Vortex',
      	tmdbMovieUrl: '',
        tmdbMovieCreditsUrl: '',
        movie: {},
        credits: {},
        cast: {},
        crew: {}
      }
    },
    methods: {
    	setUrls(movieId) {
    		this.tmdbMovieUrl = this.getTmdbMovieUrl(movieId);
    		this.tmdbMovieCreditsUrl = this.getTmdbMovieCreditsUrl(movieId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbMovieUrl)
			.then((response) => {
				this.movie = response.data;
				this.title = this.movie.title + ' - Vortex';
			});

	        axios.get(this.tmdbMovieCreditsUrl)
	        .then((response) => {
	        	this.credits = response.data;
	          	this.cast = response.data.cast;
	          	this.crew = response.data.crew;
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