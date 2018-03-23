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

		<div class="uk-container uk-margin-medium-top">
		
			<div v-for="list of userLists">

				<h2>{{list['.key'] | capitalize }}</h2>

				<!-- <div v-for="(item, key) of list">

					<div v-if="item.title">
						{{item.id}} - {{item.title}}
						<button @click="removeFromList(key, list)">Remove</button>
					</div>
					<div v-if="item.name">
						{{item.id}} - {{item.name}}
						<button @click="removeFromList(key, list)">Remove</button>
					</div>

				</div> -->

				<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
					<div v-for="(item, key) of list">

						<div v-if="item.title">
					
							
			                <div class="fa-poster uk-inline-clip uk-transition-toggle">

			                	<router-link :to="`/movie/${item.id}`">
									<div v-if="item.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${item.poster_path});background-size: cover;`">
									<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
									</div>

									<img v-else src="../assets/missingPoster.jpg" alt="">
								</router-link>

								<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">

									<ul class="uk-iconnav">

										<img 
										uk-tooltip="title: Remove" 
										class="fa-poster-icon" 
										@click="removeFromList(key, list)" 
										src="../assets/trash.png" 
										alt="">

									</ul>

								</div>

			                </div>
			                

		            	</div>

		            	<div v-if="item.name">
					
							
			                <div class="fa-poster uk-inline-clip uk-transition-toggle">

								<router-link :to="`/tv/${item.id}`">
									<div v-if="item.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${item.poster_path});background-size: cover;`">
									<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
									</div>

									<img v-else src="../assets/missingPoster.jpg" alt="">
								</router-link>

								<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">

									<ul class="uk-iconnav">

										<img 
										uk-tooltip="title: Remove" 
										class="fa-poster-icon" 
										@click="removeFromList(key, list)" 
										src="../assets/trash.png" 
										alt="">

									</ul>

								</div>

			                </div>
			                

		            	</div>
					
					</div>

				</div>

				<hr>

			</div>

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