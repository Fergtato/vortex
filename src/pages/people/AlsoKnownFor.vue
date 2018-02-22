<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{ person.name }} - Also Known For</h3>
				
				<div v-if="movie_credits.cast.length > 0">
					<h4>Movies as cast</h4>
					
					<ul>
						<li v-for="movie in movie_credits.cast">
			                {{ movie.release_date.slice(0,4)}} - {{ movie.title }}
			            </li>
					</ul>
				</div>
	
				<div v-if="movie_credits.crew.length > 0">
					<h4>Movies as crew</h4>
					
					<ul>
						<li v-for="movie in movie_credits.crew">
			                {{ movie.title }} - {{ movie.department }} - {{ movie.job }}
			            </li>
					</ul>
				</div>
				
				<div v-if="tv_credits.cast.length > 0">
					<h4>TV Shows as cast</h4>
					
					<ul>
						<li v-for="tvShow in tv_credits.cast">
			                {{ tvShow.first_air_date.slice(0,4) }} - {{ tvShow.name }} : {{ tvShow.episode_count }}
			            </li>
					</ul>
				</div>
				
				<div v-if="tv_credits.crew.length > 0">
					<h4>TV Shows as crew</h4>
					
					<ul>
						<li v-for="tvShow in tv_credits.crew">
			                {{ tvShow.name }} - {{ tvShow.department }} - {{ tvShow.job }}
			            </li>
					</ul>
				</div>

	            <!-- <pre>{{ movie_credits.cast }}</pre> -->

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
        tv_credits: {}
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
	        	this.movie_credits = response.data;
	        });

	        axios.get(this.tmdbPersonTvCreditsUrl)
	        .then((response) => {
	        	this.tv_credits = response.data;
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