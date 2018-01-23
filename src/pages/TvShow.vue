<template>
  <div>

  	<dash-nav></dash-nav>

  	<h1> {{ tvShow.status }} </h1>
    
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
      	tvShow: {},
      	genres: {},
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
	},

	setUrls(tvShowId) {
		this.tmdbTvUrl = this.getTmdbTvUrl(tvShowId);
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
  	this.setUrls(this.$route.params.movieId);

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