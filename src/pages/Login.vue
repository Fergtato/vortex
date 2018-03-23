<template>
	<div>
		
		<home-nav></home-nav>
		
		<div class="fa-dash-content">

			<div class="uk-align-center uk-width-2-5@m uk-margin-medium-top">

				<h2>Log In</h2>

		    		<form class="uk-form-stacked">

				        <p>{{errorMessage}}</p>

				        <div class="uk-margin">
				            <label class="uk-form-label" for="form-stacked-email">Email</label>
				            <div class="uk-form-controls">
				                <input v-model="email" class="uk-input" id="form-stacked-email" type="text" placeholder="Email...">
				            </div>
				        </div>

				        <div class="uk-margin">
				            <label class="uk-form-label" for="form-stacked-pass">Password</label>
				            <div class="uk-form-controls">
				                <input v-on:keydown.enter.prevent='logIn' v-model="pass" class="uk-input" id="form-stacked-pass" type="password" placeholder="Password...">
				            </div>
				        </div>

				    </form> <!-- closing form -->

				    <div class="uk-margin">
			        	<button @click="logIn" class="uk-button uk-button-primary">Log In</button>
			        </div>

			        <div class="uk-margin">
			        	<button @click="googleLogin" class="uk-button uk-button-secondary">
			        		<span uk-icon="google"></span> Google
			        	</button>
			        	<button @click="facebookLogin" class="uk-button uk-button-secondary">
			        		<span uk-icon="facebook"></span> Facebook
			        	</button>
			        </div>

			</div> <!-- closing center -->

		</div> <!-- closing content -->

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
	watch: {
      '$route' (to, from) {
        
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