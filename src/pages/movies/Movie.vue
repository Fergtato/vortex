<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<div class="fa-movie-banner uk-background-cover" 
				:style="`background-image: url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path});`">
				<div class="fa-banner-overlay"></div>
			</div>


	     	<div class="fa-dash-content">


			<div class="uk-grid-medium" uk-grid>

			    <div class="uk-width-1-4">
			        

	        		<img class="fa-poster fa-poster-pull" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">

	        		<div class="fa-poster-pull uk-padding uk-padding-remove-horizontal">

	        			
	        			<p>
	        				<span class="uk-text-bold">Status</span>
	        				<br>
	        				{{movie.status}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Release Date</span>
	        				<br>
	        				{{movie.release_date}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Original Language</span>
	        				<br>
	        				{{movie.original_language}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Runtime</span>
	        				<br>
	        				{{movie.runtime}} mins
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Budget</span>
	        				<br>
	        				${{movie.budget | priceFormat}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Revenue</span>
	        				<br>
	        				${{movie.revenue | priceFormat}}
	        			</p>
	        			<p class="uk-text-truncate">
	        				<span class="uk-text-bold">Homepage</span>
	        				<br>
	        				<a :href="`${movie.homepage}`" target="_blank">{{movie.homepage}}</a>
	        			</p>


	        		</div>


			    </div>

			    <div class="uk-width-3-4">
			        
					<h2 class="uk-margin-small-bottom">{{movie.title}}</h2>

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

					<span class="uk-margin-right">{{ movie.release_date | truncate('4') }}</span>

					<span v-for="genre in genres" class="uk-badge uk-margin-small-right">{{genre.name}}</span>

					<p>{{movie.overview}}</p>

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
					        </div>
					    </div>
					    
					</div>
					
					<router-link :to="`/movie/${movie.id}/cast`" class="uk-button uk-button-link uk-margin-top">Full Cast & Crew <span uk-icon="arrow-right"></span></router-link>
					
					
					<h3>Recommendations</h3>

					<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
			        	<div v-for="movie in recommendations.slice(0,5)">

			        		<poster :type="posterType" :media="movie" :showIcons="showPosterIcons"></poster>

			        	</div>

			        </div>

			        <router-link :to="`/movie/${movie.id}/recommendations`" class="uk-button uk-button-link uk-margin-top">View All Recommendations <span uk-icon="arrow-right"></span></router-link>

			        <h3>Reviews</h3>
			        
			        <ul uk-accordion v-for="review in reviews">
					    <li>
					        <a class="uk-accordion-title uk-text-muted" href="#">{{ review.author }} <span uk-icon="chevron-down"></span></a>
					        <div class="uk-accordion-content">
					            <p>{{ review.content }}</p>
					        </div>
					    </li>
					</ul>




			    </div>

			</div>


			<div id="trailer-modal" class="uk-flex-top" uk-modal>
			    <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
			        <button class="uk-modal-close-outside" type="button" uk-close></button>
			        <iframe :src="`//www.youtube.com/embed/${trailerKey}`" width="1120" height="630" frameborder="0" uk-video></iframe>
			    </div>
			</div>

			<!-- <router-link to='/movies/346364'>IT</router-link> -->


	     	</div>
	    </div>


	    <div id="login-modal" uk-modal>
		    <div class="uk-modal-dialog uk-modal-body">
		        <p class="uk-text-large">Log in or Sign up to add to a list!</p>
		        <p class="uk-text-right">
		        	<router-link to="/login">
			            <button class="uk-button uk-button-default uk-modal-close" type="button">Log In</button>
			        </router-link>
			        <router-link to="/signup">
			            <button class="uk-button uk-button-primary" type="button">Sign Up</button>
			        </router-link>
		        </p>
		    </div>
		</div>

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
    data() {
      return {
      	title: 'Movie - Vortex',
        tmdbMovieUrl: '',
        tmdbMovieVideosUrl: '',
        tmdbMovieCreditsUrl: '',
        tmdbMovieRecomsUrl: '',
        tmdbMovieReviewsUrl: '',
        movie: {},
        genres: {},
        videos: {},
        cast: {},
        crew: {},
        reviews: {},
        recommendations: {},
        trailerKey: '',
        posterType: 'movie',
        user: {},
		userLists: {},
		favourites: {},
		watchlist: {},
		watched: {},
		listItemKey: '',
		showPosterIcons: false,
		userLoggedIn: false
      }
    },
    methods: {
    	apiCalls() {
    		axios.get(this.tmdbMovieUrl)
			.then((response) => {
				this.movie = response.data;
				this.genres = this.movie.genres;
				this.title = this.movie.title + ' - Vortex';
			});

			axios.get(this.tmdbMovieVideosUrl)
	        .then((response) => {
	          this.videos = response.data.results;
	          this.trailerKey = this.videos[0].key;
	        });

	        axios.get(this.tmdbMovieCreditsUrl)
	        .then((response) => {
	          this.cast = response.data.cast;
	          this.crew = response.data.crew;
	        });

	        axios.get(this.tmdbMovieRecomsUrl)
	        .then((response) => {
	          this.recommendations = response.data.results;
	        });

	        axios.get(this.tmdbMovieReviewsUrl)
	        .then((response) => {
	          this.reviews = response.data.results;
	        });
    	},
    	setUrls(movieId) {
    		this.tmdbMovieUrl = this.getTmdbMovieUrl(movieId);
    		this.tmdbMovieVideosUrl = this.getTmdbMovieVideosUrl(movieId);
    		this.tmdbMovieCreditsUrl = this.getTmdbMovieCreditsUrl(movieId);
    		this.tmdbMovieRecomsUrl = this.getTmdbMovieRecomsUrl(movieId);
    		this.tmdbMovieReviewsUrl = this.getTmdbMovieReviewsUrl(movieId);
    	},
    	addToList(listName) {
    		if (this.userLoggedIn) {
				userListsRef.child(listName).push(this.movie);

				this.notification("Added to " + listName);
			} else {
				UIkit.modal('#login-modal').show();
			}
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

					if (this.favourites[i].id == this.movie.id) {
						found = true;
						this.listItemKey = this.favourites[i]['.key'];
						return false;
					}
					
				}
			}
			else if (listName === 'watchlist') {
				for (var i = 0; i < Object.keys(this.watchlist).length; i++) {

					if (this.watchlist[i].id == this.movie.id) {
						found = true;
						this.listItemKey = this.watchlist[i]['.key'];
						return false;
					}
					
				}
			}
			else if (listName === 'watched') {
				for (var i = 0; i < Object.keys(this.watched).length; i++) {

					if (this.watched[i].id == this.movie.id) {
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

			this.setUrls(to.params.movieId);

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

		firebase.auth().onAuthStateChanged((user) => {
    		if(user) {
        		this.user = firebase.auth().currentUser;
        		this.$bindAsArray('userLists', userListsRef);
        		this.$bindAsArray('favourites', userListsRef.child('favourites'));
        		this.$bindAsArray('watchlist', userListsRef.child('watchlist'));
        		this.$bindAsArray('watched', userListsRef.child('watched'));
        		this.userLoggedIn = true;
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
    		if (typeof value == 'undefined') {
    			return '';
    		} else {
    			return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    		}
    	}
    }
  }
</script>