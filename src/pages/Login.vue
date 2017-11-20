<template>
	<div>
		
		<home-nav></home-nav>
		
		<div class="uk-container">

		<h2>Log In</h2>

		    <form class="uk-form-stacked">

		        <p>{{errorMessage}}</p>

		        <div class="uk-margin">
		            <label class="uk-form-label" for="form-stacked-email">Email</label>
		            <div class="uk-form-controls uk-width-1-2@s">
		                <input v-model="email" class="uk-input" id="form-stacked-email" type="text" placeholder="Email...">
		            </div>
		        </div>

		        <div class="uk-margin">
		            <label class="uk-form-label" for="form-stacked-pass">Password</label>
		            <div class="uk-form-controls uk-width-1-2@s">
		                <input v-model="pass" class="uk-input" id="form-stacked-pass" type="password" placeholder="Password...">
		            </div>
		        </div>

		    </form>

		    <div class="uk-margin">
	        	<button @click="logIn" class="uk-button uk-button-primary">Log In</button>
	        </div>

	        <div class="uk-margin">
	        	<button @click="googleLogin" class="uk-button uk-button-secondary">Google</button>
	        	<button @click="facebookLogin" class="uk-button uk-button-secondary">Facebook</button>
	        </div>

	    </div>

	</div>
</template>

<script>
import firebase from 'firebase';
var provider = new firebase.auth.GoogleAuthProvider();
var fprovider = new firebase.auth.FacebookAuthProvider();

export default {
	data() {
		return {
			email: '',
			pass: '',
			errorMessage: ''
		}
	},
	methods: {
		logIn: function() {
	      const auth = firebase.auth();
	      const promise = auth.signInWithEmailAndPassword(this.email, this.pass);
	      promise.catch(event =>
	        this.errorMessage = event.message
	      );
	    },
	    googleLogin: function() {
	        firebase.auth().signInWithPopup(provider).then(function(result) {
	            console.log(result);
	        }).catch(function(error) {console.log(error)});
	    },
	    facebookLogin: function() {
	        firebase.auth().signInWithPopup(fprovider).then(function(result) {
	            console.log(result);
	        }).catch(function(error) {console.log(error)});
	    }
	},
	created() {
		firebase.auth().onAuthStateChanged((user) => {
	     	if(user) {
	    		this.$router.push('/user')
	    	} else {
	        	// this.$router.push('/auth')
	    	}
	    });
	}
}
</script>