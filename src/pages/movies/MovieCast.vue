<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

	     		<h3>{{movie.title}}</h3>
	     		<h4>Cast</h4>
	     		
	     		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>

		     		<div v-for="person in cast">

	                	<poster :type="posterType" :media="person"></poster>

	             	</div>

            	</div>

            	<br>

            	<div v-if="crew.length > 0">
					<h4>Crew</h4>
					
					<ul>
						<li v-for="person in crew">
			                {{ person.name }} - {{ person.department }} - {{ person.job }}
			            </li>
					</ul>
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
      	title: 'Cast - Vortex',
      	tmdbMovieUrl: '',
        tmdbMovieCreditsUrl: '',
        movie: {},
        credits: {},
        cast: {},
        crew: {},
        posterType: 'person'
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