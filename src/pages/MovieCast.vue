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

  export default {
    data() {
      return {
      	title: 'Cast - Vortex',
      	apiUrl: 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '?api_key=136727d529c2b6275946c6442cee626d',
        creditsUrl: 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '/credits?api_key=136727d529c2b6275946c6442cee626d',
        movie: {},
        credits: {},
        cast: {},
        crew: {}
      }
    },
    methods: {
    	apiCalls() {

    		axios.get(this.apiUrl)
			.then((response) => {
				this.movie = response.data;
				this.title = this.movie.title + ' - Vortex';
			});

	        axios.get(this.creditsUrl)
	        .then((response) => {
	        	this.credits = response.data;
	          	this.cast = response.data.cast;
	          	this.crew = response.data.crew;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

		this.apiCalls();

		document.title = this.title;

    }
  }
</script>