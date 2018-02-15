<template>
	<div>
		
		<home-nav></home-nav>

		<!-- <h2>Favourites</h2>
		
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
		</div> -->

		
		
		<div v-for="list of userLists">

			<h2>{{list['.key'] | capitalize }}</h2>

			<div v-for="(item, key) of list">

				<div v-if="item.title">
					{{item.id}} - {{item.title}}
					<button @click="removeFromList(key, list)">Remove</button>
				</div>
				<div v-if="item.name">
					{{item.id}} - {{item.name}}
					<button @click="removeFromList(key, list)">Remove</button>
				</div>

			</div>

			<hr>

		</div>

		<!-- <pre>{{ userLists }}</pre> -->

	</div>
</template>

<script>
import firebase from 'firebase';

// import { favouritesRef } from '../firebase';
// import { watchlistRef } from '../firebase';
// import { listsRef } from '../firebase';

// import { userFavouritesRef } from '../firebase';
// import { userWatchlistRef } from '../firebase';

import { userListsRef } from '../firebase';

export default {
	data() {
		return {
			user: {},
			userLists: {}
		}
	},
	methods: {
		removeFromList(key, list) {
			userListsRef.child(list['.key']).child(key).remove();
		}
	},
	created() {

		firebase.auth().onAuthStateChanged((user) => {
    		if(user) {
        		this.user = firebase.auth().currentUser;
        		this.$bindAsArray('userLists', userListsRef)
    		} else {
        		this.$router.push(this.$router.go(-1))
    		}
    	});

	},
	filters: {
	  capitalize: function (value) {
	    if (!value) return ''
	    value = value.toString()
	    return value.charAt(0).toUpperCase() + value.slice(1)
	  }
	}
}
</script>