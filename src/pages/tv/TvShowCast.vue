<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

	     		<h3>{{tvShow.name}}</h3>
	     		<h4>Cast</h4>
	     		
	     		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>

		     		<div v-for="person in cast">

	                	<poster :type="posterType" :media="person"></poster>

	             	</div>

            	</div>

            	<br>

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
      	tmdbTvUrl: '',
        tmdbTvCreditsUrl: '',
        tvShow: {},
        credits: {},
        cast: {},
        crew: {},
        posterType: 'person'
      }
    },
    methods: {
    	setUrls(tvShowId) {
    		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
    		this.tmdbTvCreditsUrl = this.getTmdbTvCreditsUrl(tvShowId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.title = this.tvShow.name + ' - Vortex';
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