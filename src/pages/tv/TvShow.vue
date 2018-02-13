<template>
  <div>

  	<dash-nav></dash-nav>

        <div class="fa-dash-content-wrapper uk-dark uk-preserve-color">
      
      <div class="fa-movie-banner uk-background-cover" 
        :style="`background-image: url(https://image.tmdb.org/t/p/w1280${tvShow.backdrop_path});`">
        <div class="fa-banner-overlay"></div>
      </div>

      <div class="fa-dash-content">

        <div class="uk-grid-medium" uk-grid>

          <div class="uk-width-1-4">
              
            <img class="fa-poster fa-poster-pull" :src="`https://image.tmdb.org/t/p/w342${tvShow.poster_path}`" alt="">

            <div class="fa-poster-pull uk-padding uk-padding-remove-horizontal">

              <!-- <pre> {{ tvShow }} </pre> -->

                <p>
                  <span class="uk-text-bold">Status</span>
                  <br>
                  {{ tvShow.status }}
                </p>
                <p>
                  <span class="uk-text-bold">First Air Date</span>
                  <br>
                  {{ tvShow.first_air_date }}
                </p>
                <p>
                  <span class="uk-text-bold">Original Language</span>
                  <br>
                  {{ tvShow.original_language }}
                </p>
                <p>
                  <span class="uk-text-bold">Runtime</span>
                  <br>
                  {{ tvShow.episode_run_time }} mins
                </p>
                <p>
                  <span class="uk-text-bold">Number Of Episodes</span>
                  <br>
                  {{ tvShow.number_of_episodes }} 
                </p>
                <p>
                  <span class="uk-text-bold">Number Of Seasons</span>
                  <br>
                  {{ tvShow.number_of_seasons }} 
                </p>

               <!--  <p class="uk-text-truncate">
                  <span class="uk-text-bold">Homepage</span>
                  <br>
                  <a :href="`${movie.homepage}`" target="_blank">{{ tvShow.homepage }}</a>
                </p> -->

            </div> <!-- closing padding div -->

          </div> <!-- closing uk width 1 4 -->

          <div class="uk-width-3-4">

            <h2 class="uk-margin-small-bottom">{{tvShow.original_name}}</h2>

            <!-- <span class="uk-margin-right">{{ tvShow.air_date | truncate('4') }}</span> -->

            <span v-for="genre in genres" class="uk-badge uk-margin-small-right">{{genre.name}}</span>

            <p>{{tvShow.overview}}</p>

            <button class="uk-button uk-button-primary uk-button" href="#trailer-modal" uk-toggle> 
            <span uk-icon="icon: play"></span> Play Trailer
            </button>

            <h3>Cast</h3>

            <div class="uk-grid-match uk-grid-small uk-child-width-1-5@m" uk-grid>

              <div v-for="person in cast.slice(0,5)">

                <div class="uk-card uk-card-default uk-box-shadow-large">

                  <div class="uk-card-media-top">
                    <img class="fa-cast-image" :src="`https://image.tmdb.org/t/p/w276_and_h350_bestv2${person.profile_path}`" alt="">
                  </div>

                  <div class="uk-card-body uk-padding-small">
                    <p class="uk-text-bold uk-margin-remove-bottom">{{person.name}}</p>
                    <p class="uk-margin-remove-top uk-text-small">{{person.character}}</p>
                  </div>

                </div> <!-- closing uk card default -->

              </div> <!-- closing person in cast slice -->
                
            </div> <!-- closing uk grid small cast & crew -->

            <router-link :to="`/tv/${tvShow.id}/cast`" class="uk-button uk-button-link uk-margin-top">Full Cast & Crew</router-link>

            <h3>Recommendations</h3>

            <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
        
              <div v-for="tvShow in recommendations.slice(0,5)">

                <poster :type="posterType" :media="tvShow"></poster>

              </div>

            </div> <!-- closing uk grid small recommendations -->

            <router-link :to="`/tv/${tvShow .id}/recommendations`" class="uk-button uk-button-link uk-margin-top">View All Recommendations</router-link>

          </div> <!-- closing uk width 3 4 -->

        </div> <!-- closing the grid  -->

        <div id="trailer-modal" class="uk-flex-top" uk-modal>

          <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
            <button class="uk-modal-close-outside" type="button" uk-close></button>
            <iframe :src="`//www.youtube.com/embed/${trailerKey}`" width="1120" height="630" frameborder="0" uk-video></iframe>
          </div>

        </div> <!-- closing trailer  -->

      </div> <!-- closing content  -->

    </div> <!-- closing wrapper  -->   

  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../../mixins/tmdb.js';

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
      	posterType: 'tv'
    }
  },

  methods: {
  	apiCalls() {
  		axios.get(this.tmdbTvUrl)
			.then((response) => {
				this.tvShow = response.data;
				this.genres = this.tvShow.genres;
				this.title = this.tvShow.name + ' - Vortex';
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