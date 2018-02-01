<template>
	<div>
		
		<home-nav></home-nav>

		<h2>Favourites</h2>
		
		<div v-if="favourites.length > 0">
			<ul>
				<li v-for="item of favourites">
					<div v-if="item.title">
						{{item.title}} - {{item.release_date}} - Movie
						<button @click="removeFromFavourites(item)">Remove</button>
					</div>
					<div v-if="item.name">
						{{item.name}} - {{item.first_air_date}} - TV Show
						<button @click="removeFromFavourites(item)">Remove</button>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			<p>Favourites is empty</p>
		</div>

		<!-- <pre>{{ userFavs }}</pre> -->

		<h2>Watchlist</h2>
		
		<div v-if="watchlist.length > 0">
			<ul>
				<li v-for="item of watchlist">
					<div v-if="item.title">
						{{item.title}} - {{item.release_date}} - Movie
						<button @click="removeFromWatchlist(item)">Remove</button>
					</div>
					<div v-if="item.name">
						{{item.name}} - {{item.first_air_date}} - TV Show
						<button @click="removeFromWatchlist(item)">Remove</button>
					</div>
				</li>
			</ul>
		</div>
		<div v-else>
			<p>Watchlist is empty</p>
		</div>

		<!-- <pre>{{ favourites }}</pre> -->

	</div>
</template>

<script>
import firebase from 'firebase';

import { favouritesRef } from '../firebase';
import { watchlistRef } from '../firebase';

import { userFavouritesRef } from '../firebase';
import { userWatchlistRef } from '../firebase';

export default {
	data() {
		return {
			user: {},
			favourites: {},
			watchlist: {}
		}
	},
	methods: {
		removeFromFavourites(item) {
			userFavouritesRef.child(item['.key']).remove();
		},
		removeFromWatchlist(item) {
			userWatchlistRef.child(item['.key']).remove();
		}
	},
	created() {
		firebase.auth().onAuthStateChanged((user) => {
    		if(user) {
        		this.user = firebase.auth().currentUser;
        		this.$bindAsArray('favourites', favouritesRef.child(this.user.uid))
        		this.$bindAsArray('watchlist', watchlistRef.child(this.user.uid))
    		} else {
        		this.$router.push(this.$router.go(-1))
    		}
    	});

    	
	}
}
</script>