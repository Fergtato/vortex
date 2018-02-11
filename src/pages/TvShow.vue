<template>
  <div>

  	<dash-nav></dash-nav>

  	<!-- {{ tvShow }} -->

        <div class="fa-dash-content-wrapper uk-dark uk-preserve-color">
      
      <!-- <div class="fa-movie-banner uk-background-cover" 
        :style="`background-image: url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path});`">
        <div class="fa-banner-overlay"></div>
      </div> -->

      <div class="fa-dash-content">

        <div class="uk-grid-medium" uk-grid>

          <div class="uk-width-1-4">
              
            <img class="fa-poster fa-poster-pull" :src="`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`" alt="">

            <div class="fa-poster-pull uk-padding uk-padding-remove-horizontal">

                <p>
                  <span class="uk-text-bold">Status</span>
                  <br>
                  {{ tvShow.status }}
                </p>
                <p>
                  <span class="uk-text-bold">Release Date</span>
                  <br>
                  {{ tvShow.release_date }}
                </p>
                <p>
                  <span class="uk-text-bold">Original Language</span>
                  <br>
                  {{ tvShow.original_language }}
                </p>
                <p>
                  <span class="uk-text-bold">Runtime</span>
                  <br>
                  {{ tvShow.runtime }} mins
                </p>
                <p>
                  <span class="uk-text-bold">Budget</span>
                  <br>
                  ${{ tvShow.budget | priceFormat }}
                </p>
                <p>
                  <span class="uk-text-bold">Revenue</span>
                  <br>
                  ${{ tvShow.revenue | priceFormat }}
                </p>
                <p class="uk-text-truncate">
                  <span class="uk-text-bold">Homepage</span>
                  <br>
                  <a :href="`${movie.homepage}`" target="_blank">{{ tvShow.homepage }}</a>
                </p>

            </div> <!-- closing padding div -->

          </div> <!-- closing uk width 1 4 -->

        </div> <!-- closing the grid -->

      </div> <!-- closing content -->

    </div> <!-- closing wrapper -->
    
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