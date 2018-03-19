<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">
				
				<router-link :to="`/tv/${tvShow.id}`">
					<span uk-icon="arrow-left"></span> {{tvShow.name}}
				</router-link>

	     		<h3 class="uk-margin-small-top">{{tvShow.name}} - {{season.name}} &nbsp; <span class="uk-text-meta">{{season.air_date.slice(0,4)}}</span></h3>
	     		

	     		<p>{{season.overview}}</p>

	     		<h4>Episodes</h4>
	     		
	     		<div v-for="episode in season.episodes">

	     			<div class="uk-margin-large-bottom" uk-grid>
					    <div class="uk-width-1-4@m">
					        <img :src="`https://image.tmdb.org/t/p/original${episode.still_path}`" alt="">
					    </div>
					    <div class="uk-width-3-4@m">
				            <h5><span class="uk-text-bold">{{episode.episode_number}}</span>
				            &nbsp; {{episode.name}} &nbsp; 
				            <span class="uk-text-meta">{{episode.air_date}}</span></h5>
				            <p>{{episode.overview}}</p>
					    </div>
					</div>

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
      	title: 'Season - Vortex',
      	tmdbTvUrl: '',
        tmdbTvSeasonUrl: '',
        tvShow: {},
        season: {}
      }
    },
    methods: {
    	setUrls(tvShowId, seasonNum) {
    		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
    		this.tmdbTvSeasonUrl = this.getTmdbTvSeasonUrl(tvShowId, seasonNum);
    	},
    	apiCalls() {

    		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.title = this.tvShow.name + ' - Vortex';
			});

	        axios.get(this.tmdbTvSeasonUrl)
	        .then((response) => {
	        	this.season = response.data;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.setUrls(to.params.tvShowId, to.params.seasonNum);
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls(this.$route.params.tvShowId, this.$route.params.seasonNum);
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>