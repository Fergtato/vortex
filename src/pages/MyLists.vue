<template>
	<div>
		
		<home-nav></home-nav>

		<h2>{{user.displayName}}'s Favourites</h2>

		<li v-for="item of favourites">{{item.title}} - {{item.release_date}}</li>

		<pre>{{ favourites }}</pre>

	</div>
</template>

<script>
import firebase from 'firebase';
import { favouritesRef } from '../firebase';

export default {
	data() {
		return {
			user: {},
			favourites: {}
		}
	},
	methods: {

	},
	created() {
		firebase.auth().onAuthStateChanged((user) => {
    		if(user) {
        		this.user = firebase.auth().currentUser;
        		this.$bindAsObject('favourites', favouritesRef.child(this.user.uid))
    		} else {
        		this.$router.push(this.$router.go(-1))
    		}
    	});

    	
	}
}
</script>