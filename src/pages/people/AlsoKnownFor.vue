<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{ person.name }} - Also Known For</h3>
				
				<h4>Tv Shows</h4>
				<pre>{{ cast }}</pre>

				<!-- <h4>Tv</h4>
				<p v-if="media == tv">
					<pre>{{ cast }}</pre>
				</p>

				<h4>Movies</h4>
				<p v-else="media == movie">
					<pre>{{ cast }}</pre>
				</p> -->


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
      	title: 'Also Known For - Vortex',
      	tmdbPersonUrl: '',
        tmdbPersonMovieCreditsUrl: '',
        tmdbPersonTvCreditsUrl: '',
        person: {},
        movie_credits: {},
        tv_credits: {},
        cast: {},
        crew: {}
      }
    },
    methods: {
    	setUrls(personId) {
    		this.tmdbPersonUrl = this.getTmdbPersonUrl(personId);
    		this.tmdbPersonMovieCreditsUrl = this.getTmdbPersonMovieCreditsUrl(personId);
    		this.tmdbPersonTvCreditsUrl = this.getTmdbPersonTvCreditsUrl(personId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbPersonUrl)
			.then((response) => {
				this.person = response.data;
				this.name = this.person.name + ' - Vortex';
			});

	        axios.get(this.tmdbPersonMovieCreditsUrl)
	        .then((response) => {
	        	this.movie_credits = response.data.results;
	        	this.cast = response.data.cast;
	          	this.crew = response.data.crew;
	        });

	        axios.get(this.tmdbPersonTvCreditsUrl)
	        .then((response) => {
	        	this.tv_credits = response.data.results;
	        	this.cast = response.data.cast;
	          	this.crew = response.data.crew;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.setUrls(to.params.personId);
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls(this.$route.params.personId);
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>