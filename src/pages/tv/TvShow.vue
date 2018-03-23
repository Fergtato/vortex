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

            </div> <!-- closing padding div -->

          </div> <!-- closing uk width 1 4 -->

          <div class="uk-width-3-4">

            <h2 class="uk-margin-small-bottom">{{tvShow.original_name}}</h2>

            <ul class="uk-iconnav uk-margin-small-bottom">
              <img 
                uk-tooltip="title: Add To Favourites" 
                class="fa-poster-icon" 
                v-if="checkList('favourites')" 
                @click="addToList('favourites')" 
                src="../../assets/heart-dark.png" 
                alt="">
              <img 
                uk-tooltip="title: Remove From Favourites" 
                class="fa-poster-icon-filled" 
                v-else 
                @click="removeFromList('favourites')" 
                src="../../assets/heart-filled.png" 
                alt="">

              <img 
                uk-tooltip="title: Add To Watchlist" 
                class="fa-poster-icon" 
                v-if="checkList('watchlist')" 
                @click="addToList('watchlist')" 
                src="../../assets/bookmark-dark.png" 
                alt="">
              <img 
                uk-tooltip="title: Remove From Watchlist" 
                class="fa-poster-icon-filled" 
                v-else 
                @click="removeFromList('watchlist')" 
                src="../../assets/bookmark-filled.png" 
                alt="">

              <img 
                uk-tooltip="title: Add To Watched" 
                class="fa-poster-icon" 
                v-if="checkList('watched')" 
                @click="addToList('watched')" 
                src="../../assets/plus-circle-dark.png" 
                alt="">
              <img 
                uk-tooltip="title: Remove From Watched" 
                class="fa-poster-icon-filled" 
                v-else 
                @click="removeFromList('watched')" 
                src="../../assets/plus-circle-filled.png" 
                alt="">
            </ul>

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
                    <router-link :to="`/person/${person.id}`">
                      <img class="fa-cast-image" :src="`https://image.tmdb.org/t/p/w276_and_h350_bestv2${person.profile_path}`" alt="">
                    </router-link>
                  </div>

                  <div class="uk-card-body uk-padding-small">
                    <router-link :to="`/person/${person.id}`">
                      <p class="uk-text-bold uk-margin-remove-bottom">{{person.name}}</p>
                    </router-link>
                    <p class="uk-margin-remove-top uk-text-small">{{person.character}}</p>
                  </div>

                </div> <!-- closing uk card default -->

              </div> <!-- closing person in cast slice -->
                
            </div> <!-- closing uk grid small cast & crew -->

            <router-link :to="`/tv/${tvShow.id}/cast`" class="uk-button uk-button-link uk-margin-top">Full Cast & Crew <span uk-icon="arrow-right"></span></router-link>


            <h3>Latest Seasons</h3>

            <!-- <pre>{{tvShow.seasons}}</pre> -->

            <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
        
              <div v-for="season in tvShow.seasons.slice(0,5)">
                
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

            <router-link :to="`/tv/${tvShow .id}/viewallseasons`" class="uk-button uk-button-link uk-margin-top">View All Seasons <span uk-icon="arrow-right"></span></router-link>




            <h3>Recommendations</h3>

            <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
        
              <div v-for="tvShow in recommendations.slice(0,5)">

                <poster :type="posterType" :media="tvShow" :showIcons="showPosterIcons"></poster>

              </div>

            </div> <!-- closing uk grid small recommendations -->

            <router-link :to="`/tv/${tvShow .id}/recommendations`" class="uk-button uk-button-link uk-margin-top">View All Recommendations <span uk-icon="arrow-right"></span></router-link>

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

import { userListsRef } from '../../firebase';
import UIkit from 'uikit';

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
      	posterType: 'tv',
        user: {},
        userLists: {},
        favourites: {},
        watchlist: {},
        watched: {},
        listItemKey: '',
        showPosterIcons: false
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
  	},
    addToList(listName) {
      userListsRef.child(listName).push(this.tvShow);

      this.notification("Added to " + listName);
    },
    removeFromList(listName) {
      this.checkList(listName);
      userListsRef.child(listName).child(this.listItemKey).remove();
      console.log("Removing " + this.listItemKey + " from " + listName);


      this.notification("Removed from " + listName);
    },
    notification(message) {

      UIkit.notification({
        message: "<span uk-icon='icon: check'></span>  " + message,
        pos: 'bottom-right',
        timeout: 1000
      });

    },
    checkList(listName) {
      var found = false;

      if (listName === 'favourites') {
        for (var i = 0; i < Object.keys(this.favourites).length; i++) {

          if (this.favourites[i].id == this.tvShow.id) {
            found = true;
            this.listItemKey = this.favourites[i]['.key'];
            return false;
          }
          
        }
      }
      else if (listName === 'watchlist') {
        for (var i = 0; i < Object.keys(this.watchlist).length; i++) {

          if (this.watchlist[i].id == this.tvShow.id) {
            found = true;
            this.listItemKey = this.watchlist[i]['.key'];
            return false;
          }
          
        }
      }
      else if (listName === 'watched') {
        for (var i = 0; i < Object.keys(this.watched).length; i++) {

          if (this.watched[i].id == this.tvShow.id) {
            found = true;
            this.listItemKey = this.watched[i]['.key'];
            return false;
          }
          
        }
      }

      if (!found) {
        return true;
      }
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

    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
          this.user = firebase.auth().currentUser;
          this.$bindAsArray('userLists', userListsRef);
          this.$bindAsArray('favourites', userListsRef.child('favourites'));
          this.$bindAsArray('watchlist', userListsRef.child('watchlist'));
          this.$bindAsArray('watched', userListsRef.child('watched'));
          
      } else {
          console.log('user not found - Poster.vue');
      }
    });
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