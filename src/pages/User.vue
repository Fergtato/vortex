<template>
	<div>
		
		<home-nav></home-nav>

		<button @click="logOut" class="uk-button uk-button-primary">Log Out</button>

		<li v-for="fav of favs">{{fav}}</li>

		<pre>{{ user }}</pre>

	</div>
</template>

<script>
import firebase from 'firebase';
import { moviesRef } from '../firebase';
import { favsRef } from '../firebase';
console.log("C: ");
export default {
	data() {
		return {
			user: {}
		}
	},
	firebase: {
		favs: favsRef
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
        		console.log("B: " + user.uid);
    		} else {
        		this.$router.push(this.$router.go(-1))
    		}
    	});
	}
}
</script>