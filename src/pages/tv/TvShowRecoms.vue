<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

	     		<router-link :to="`/tv/${tvShow.id}`">
					<span uk-icon="arrow-left"></span> {{tvShow.name}}
				</router-link>

	     		<h3 class="uk-margin-small-top">{{tvShow.name}} - Recommendations</h3>
	     		
	     		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>

		     		<div v-for="tvShow in recommendations">

	                	<poster :type="posterType" :media="tvShow"></poster>

	             	</div>

            	</div>

				<!-- <h3>{{tvShow.name}} - Recommendations</h3>
				<pre>{{recommendations}}</pre> -->


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
      	tmdbTvUrl: '',
        tmdbTvRecomsUrl: '',
        tvShow: {},
        recommendations: {},
        posterType: 'tv'
      }
    },
    methods: {
    	setUrls(tvShowId) {
    		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
    		this.tmdbTvRecomsUrl = this.getTmdbTvRecomsUrl(tvShowId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.title = this.tvShow.name + ' - Vortex';
			});

	        axios.get(this.tmdbTvRecomsUrl)
	        .then((response) => {
	        	this.recommendations = response.data.results;
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