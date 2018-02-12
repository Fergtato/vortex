<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{tvShow.title}} Cast</h3>
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
      	tmdbTvUrl: '',
        tmdbTvCreditsUrl: '',
        tvShow: {},
        credits: {},
        cast: {},
        crew: {}
      }
    },
    methods: {
    	setUrls(tvShowId) {
    		this.tmdbTvUrl = this.tmdbTvUrl(tvShowId);
    		this.tmdbTvCreditsUrl = this.tmdbTvCreditsUrl(tvShowId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.title = this.tvShow.title + ' - Vortex';
			});

	        axios.get(this.tmdbTvCreditsUrl)
	        .then((response) => {
	        	this.credits = response.data;
	          	this.cast = response.data.cast;
	          	this.crew = response.data.crew;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.setUrls(to.params.tvShowId);
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls(this.$route.params.tvShowId);
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>