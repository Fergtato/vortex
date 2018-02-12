<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{tvShow.title}} Recommendations</h3>
				<pre>{{recommendations}}</pre>


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
        recommendations: {}
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
				this.title = this.tvShow.title + ' - Vortex';
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