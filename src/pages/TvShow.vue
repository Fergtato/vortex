<template>
  <div>

  	<dash-nav></dash-nav>

  	{{ tvShow.title }}
    
  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../mixins/tmdb.js';

export default {
  mixins: [tmdb],
  data () {
    return {
    	title: 'Tv Show - Vortex',
      	tmdbTvUrl: '',
        tmdbTvVideosUrl: '',
        tmdbTvCreditsUrl: '',
        tmdbTvRecomsUrl: '',
      	tvShow: {},
      	genres: {},
        videos: {},
        cast: {},
        crew: {},
        recommendations: {},
        trailerKey: '',
      	posterType: 'tvShow'
    }
  },

  methods: {
  	apiCalls() {
  		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.genres = this.tvShow.genres;
				this.title = this.tvShow.title + ' - Vortex';
		  });

      axios.get(this.tmdbTvVideosUrl)
      .then((response) => {
        this.videos = response.data.results;
        this.trailerKey = this.videos[0].key;
      });

      axios.get(this.tmdbTvCreditsUrl)
      .then((response) => {
        this.cast = response.data.cast;
        this.crew = response.data.crew;
      });

      axios.get(this.tmdbTvRecomsUrl)
      .then((response) => {
        this.recommendations = response.data.results;
      });
	},

	setUrls(tvShowId) {
		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
    this.tmdbTvVideosUrl = this.getTmdbTvVideosUrl(tvShowId);
    this.tmdbTvCreditsUrl = this.getTmdbTvCreditsUrl(tvShowId);
    this.tmdbTvRecomsUrl = this.getTmdbTvRecomsUrl(tvShowId);
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
  },

  filters: {
  	truncate: function(string, value) {
		return string.substring(0, value);
	},

	priceFormat: function(value) {
		return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
    	
  }
}
</script>