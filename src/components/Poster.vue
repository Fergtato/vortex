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
			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
				<button @click="addToList('favourites')">Add To Favourites</button>
				<button @click="addToList('watchlist')">Add To Watchlist</button>
				<button @click="addToList('watched')">Add To Watched</button>
				<!-- <ul class="uk-iconnav">
				    <li><a href="#" uk-icon="icon: plus"></a></li>
				    <li><a href="#" uk-icon="icon: heart"></a></li>
				    <li><a href="#" uk-icon="icon: bookmark"></a></li>
				    <li><a href="#" uk-icon="icon: bolt"></a></li>
				</ul> -->
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
		props: ['media','type'],
		data() {
			return {
				user: {},
				userLists: {}
			}
		},
		methods: {
			addToList(listName) {
				userListsRef.child(listName).push(this.media);

				this.notification(listName);
			},
			notification(listName) {

				UIkit.notification({
					message: "<span uk-icon='icon: check'></span> Added to " + listName,
					pos: 'bottom-right',
					timeout: 1000
				});

			}
		},
		created() {
		
			firebase.auth().onAuthStateChanged((user) => {
	    		if(user) {
	        		this.user = firebase.auth().currentUser;
	        		this.$bindAsArray('userLists', userListsRef);
	    		} else {
	        		console.log('user not found - Poster.vue');
	    		}
	    	});

		}
	}
</script>