<template>		
					
		<div class="fa-poster uk-inline-clip uk-transition-toggle">
			<router-link :to="`/${type}/${media.id}`">
			<!-- <img v-if="media.poster_path" :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`" alt=""> -->
			<div <div v-if="type === 'movie' || type === 'tv'">
				
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
				    	uk-tooltip="title: Info" 
				    	class="fa-poster-icon" 
				    	src="../assets/info.png" 
				    	alt="">
				</ul>
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
				test: true
			}
		},
		methods: {
			addToList(listName) {
				userListsRef.child(listName).push(this.media);

				this.notification("Added to " + listName);
				console.log(this.showIcons);
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
	        		
	    		} else {
	        		console.log('user not found - Poster.vue');
	    		}
	    	});

		}
	}
</script>