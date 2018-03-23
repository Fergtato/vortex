<template>		
					
		<div class="fa-poster uk-inline-clip uk-transition-toggle">
			<router-link :to="`/${type}/${media.id}`">
			<!-- <img v-if="media.poster_path" :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`" alt=""> -->
			<div v-if="type === 'movie' || type === 'tv'">
				
				<div v-if="media.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${media.poster_path});background-size: cover;`">
					<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
				</div>

				<img v-else src="../assets/missingPoster.jpg" alt="">

			</div>
			<div v-else>

				<div v-if="media.profile_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${media.profile_path});background-size: cover;`">
					<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
				</div>

				<img v-else src="../assets/missingPoster.jpg" alt="">
				
			</div>

			
			<!-- <p>{{media.title}}</p> -->
			</router-link>

			<div v-if="type === 'person'" class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
				<p>{{media.name}}</p>
			</div>

			<div v-if="showIcons" class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">

				<ul class="uk-iconnav">
				    <img 
				    	uk-tooltip="title: Add To Favourites" 
				    	class="fa-poster-icon" 
				    	v-if="checkList('favourites')" 
				    	@click="addToList('favourites')" 
				    	src="../assets/heart.png" 
				    	alt="">
				    <img 
				    	uk-tooltip="title: Remove From Favourites" 
				    	class="fa-poster-icon-filled" 
				    	v-else 
				    	@click="removeFromList('favourites')" 
				    	src="../assets/heart-filled.png" 
				    	alt="">

				    <img 
				    	uk-tooltip="title: Add To Watchlist" 
				    	class="fa-poster-icon" 
				    	v-if="checkList('watchlist')" 
				    	@click="addToList('watchlist')" 
				    	src="../assets/bookmark.png" 
				    	alt="">
				    <img 
				    	uk-tooltip="title: Remove From Watchlist" 
				    	class="fa-poster-icon-filled" 
				    	v-else 
				    	@click="removeFromList('watchlist')" 
				    	src="../assets/bookmark-filled.png" 
				    	alt="">

				    <img 
				    	uk-tooltip="title: Add To Watched" 
				    	class="fa-poster-icon" 
				    	v-if="checkList('watched')" 
				    	@click="addToList('watched')" 
				    	src="../assets/plus-circle.png" 
				    	alt="">
				    <img 
				    	uk-tooltip="title: Remove From Watched" 
				    	class="fa-poster-icon-filled" 
				    	v-else 
				    	@click="removeFromList('watched')" 
				    	src="../assets/plus-circle-filled.png" 
				    	alt="">

				    <img 
				    	:uk-toggle="`target: #modal${media.id}`" 
				    	uk-tooltip="title: Info" 
				    	class="fa-poster-icon" 
				    	src="../assets/info.png" 
				    	alt="">
				</ul>
			</div>

			<div :id="`modal${media.id}`" uk-modal>
			    <div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body">

			        <h2 v-if="type === 'movie'" class="uk-modal-title uk-margin-small-bottom">{{media.title}}</h2>
			        <h2 v-if="type === 'tv'" class="uk-modal-title uk-margin-small-bottom">{{media.name}}</h2>

			        <ul class="uk-iconnav uk-margin-small-bottom">
					    <img 
					    	uk-tooltip="title: Add To Favourites" 
					    	class="fa-poster-icon" 
					    	v-if="checkList('favourites')" 
					    	@click="addToList('favourites')" 
					    	src="../assets/heart-dark.png" 
					    	alt="">
					    <img 
					    	uk-tooltip="title: Remove From Favourites" 
					    	class="fa-poster-icon-filled" 
					    	v-else 
					    	@click="removeFromList('favourites')" 
					    	src="../assets/heart-filled.png" 
					    	alt="">

					    <img 
					    	uk-tooltip="title: Add To Watchlist" 
					    	class="fa-poster-icon" 
					    	v-if="checkList('watchlist')" 
					    	@click="addToList('watchlist')" 
					    	src="../assets/bookmark-dark.png" 
					    	alt="">
					    <img 
					    	uk-tooltip="title: Remove From Watchlist" 
					    	class="fa-poster-icon-filled" 
					    	v-else 
					    	@click="removeFromList('watchlist')" 
					    	src="../assets/bookmark-filled.png" 
					    	alt="">

					    <img 
					    	uk-tooltip="title: Add To Watched" 
					    	class="fa-poster-icon" 
					    	v-if="checkList('watched')" 
					    	@click="addToList('watched')" 
					    	src="../assets/plus-circle-dark.png" 
					    	alt="">
					    <img 
					    	uk-tooltip="title: Remove From Watched" 
					    	class="fa-poster-icon-filled" 
					    	v-else 
					    	@click="removeFromList('watched')" 
					    	src="../assets/plus-circle-filled.png" 
					    	alt="">
					</ul>

			        <span v-if="type === 'movie'" class="uk-margin-right">{{media.release_date}}</span>
			        <span v-if="type === 'tv'" class="uk-margin-right">{{media.first_air_date}}</span>
			        
			        <span class="uk-text-primary">Rating: {{media.vote_average}}</span>
			        <p>{{media.overview}}</p>
			        <p class="uk-text-right">
			        	<router-link :to="`/${type}/${media.id}`">
				            <button class="uk-button uk-button-primary" type="button">View <span uk-icon="icon: arrow-right"></span></button>
				        </router-link>
			        </p>
			        <button class="uk-modal-close-default" type="button" uk-close></button>
			    </div>
			</div>

			<div id="login-modal" uk-modal>
		        <div class="uk-modal-dialog uk-modal-body">
		            <p>Log in or Sign up to add to a list!</p>
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
	import { userListsRef } from '../firebase';
	import UIkit from 'uikit';
	// import { userFavouritesRef } from '../firebase';
	// import { userWatchlistRef } from '../firebase';

	export default {
		props: ['media','type','showIcons'],
		data() {
			return {
				user: {},
				userLists: {},
				favourites: {},
				watchlist: {},
				watched: {},
				listItemKey: '',
				test: true,
        		userLoggedIn: false
			}
		},
		methods: {
			addToList(listName) {
				if (this.userLoggedIn) {
					userListsRef.child(listName).push(this.media);

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

						if (this.favourites[i].id == this.media.id) {
							found = true;
							this.listItemKey = this.favourites[i]['.key'];
							return false;
						}
						
					}
				}
				else if (listName === 'watchlist') {
					for (var i = 0; i < Object.keys(this.watchlist).length; i++) {

						if (this.watchlist[i].id == this.media.id) {
							found = true;
							this.listItemKey = this.watchlist[i]['.key'];
							return false;
						}
						
					}
				}
				else if (listName === 'watched') {
					for (var i = 0; i < Object.keys(this.watched).length; i++) {

						if (this.watched[i].id == this.media.id) {
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
		created() {
		
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

		}
	}
</script>