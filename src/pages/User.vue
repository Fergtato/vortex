<template>
	<div>
		
		<home-nav></home-nav>

		<button @click="logOut" class="uk-button uk-button-primary">Log Out</button>

		<ul>
			<li v-for="movie of movies">{{movie.title}}</li>
		</ul>

		<pre>{{ user }}</pre>

	</div>
</template>

<script>
import firebase from 'firebase';
import { moviesRef } from '../firebase';

export default {
	data() {
		return {
			user: {}
		}
	},
	firebase: {
		movies: moviesRef
	},
	methods: {
		logOut() {
			firebase.auth().signOut();
		}
	},
	created() {
		firebase.auth().onAuthStateChanged((user) => {
    		if(user) {
        		this.user = firebase.auth().currentUser;
    		} else {
        		this.$router.push(this.$router.go(-1))
    		}
    	});
	}
}
</script>