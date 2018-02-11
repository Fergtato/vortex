<template>
	<div>

		<home-nav></home-nav>
		
		<div class="uk-container">

		    <h2>Sign Up</h2>

		    <form class="uk-form-stacked">

		      <p>{{errorMessage}}</p>

		      <div class="uk-margin">
		          <label class="uk-form-label" for="form-stacked-user">Username</label>
		          <div class="uk-form-controls">
		              <input v-model="userName" class="uk-input" id="form-stacked-user" type="text" placeholder="Username...">
		          </div>
		      </div>

		        <div class="uk-margin">
		            <label class="uk-form-label" for="form-stacked-email">Email</label>
		            <div class="uk-form-controls">
		                <input v-model="email" class="uk-input" id="form-stacked-email" type="text" placeholder="Email...">
		            </div>
		        </div>

		        <div class="uk-margin">
		            <label class="uk-form-label" for="form-stacked-pass">Password</label>
		            <div class="uk-form-controls">
		                <input v-on:keydown.enter.prevent='signUp' v-model="pass" class="uk-input" id="form-stacked-pass" type="password" placeholder="Password...">
		            </div>
		        </div>

		    </form>

		    <div class="uk-margin">
	        	<button @click="signUp" class="uk-button uk-button-primary">Sign Up</button>
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
			userName: '',
			email: '',
			pass: '',
			errorMessage: ''
		}
	},
	methods: {
		signUp: function() {
	      const auth = firebase.auth();
	      const promise = auth.createUserWithEmailAndPassword(this.email, this.pass);
	      promise
	      .then(user => this.signUpSucceed(user))
	      .catch(event =>
	        this.errorMessage = event.message
	      );

	    },
	    signUpSucceed: function(user) {

	      user.updateProfile({
	        displayName: this.userName,
	        photoURL: "https://cdn1.iconfinder.com/data/icons/unique-round-blue/93/user-512.png"
	      }).then(function() {
	        console.log('user updated');
	      }).catch(function(error) {
	        console.log('user not updated');
	        console.log(error);
	      });

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
    			this.$router.push(this.$router.go(-1))
    		} else {
        		// this.$router.push('/auth')
    		}
    	});
	}
}
</script>