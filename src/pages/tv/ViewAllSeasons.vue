<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

	     		<router-link :to="`/tv/${tvShow.id}`">
					<span uk-icon="arrow-left"></span> {{tvShow.name}}
				</router-link>

	     		<h3 class="uk-margin-small-top">{{tvShow.name}} - Seasons</h3>

	     		<!-- <pre>{{ tvShow.seasons }}</pre> -->
	     		
	     		<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>

		     		<div v-for="season in tvShow.seasons">
                
		                <router-link :to="`/tv/${tvShow.id}/season/${season.season_number}`">
			                <div class="fa-poster uk-inline-clip uk-transition-toggle">
			                  <div v-if="season.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${season.poster_path});background-size: cover;`">
			                    <img class="fa-poster-filler" src="../../assets/missingPoster.jpg" alt="">
			                  </div>

			                  <img v-else src="../../assets/missingPoster.jpg" alt="">
			                </div>
		                </router-link>

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
      	title: 'Seasons - Vortex',
      	tmdbTvUrl: '',
        tvShow: {},
        posterType: 'tvShow'
      }
    },
    methods: {
    	setUrls(tvShowId) {
    		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.title = this.tvShow.name + ' - Vortex';
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