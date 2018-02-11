<template>
	<div>
		
		<home-nav></home-nav>

		<button @click="logOut" class="uk-button uk-button-primary">Log Out</button>

		<pre>{{ user }}</pre>

	</div>
</template>

<script>
import firebase from 'firebase';

export default {
	data() {
		return {
			user: {}
		}
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