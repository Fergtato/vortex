<template>
	<div>
		
		<home-nav></home-nav>

	<!-- 	<pre>{{ user }}</pre> -->

		<div class="fa-dash-content">

			<div class="uk-container">

				<div class="uk-grid-medium" uk-grid>

					<div class="uk-align-center">

						<center><img class="fa-user-icon uk-border-circle uk-margin-medium-top"  :src="`${ user.photoURL }`"></center>

						<br>

						<center>
				
							<h3>{{ user.displayName }}</h3> 
							<h4>{{ user.email }}</h4>
							
							<router-link to="/mylists">
								My Lists
							</router-link>

						</center>

						<br>

						<center><button @click="logOut" class="uk-button uk-button-primary">Log Out</button></center>


					</div> <!-- closing center -->

				</div> <!-- closing grid medium -->

			</div> <!-- closing container -->
			
		</div> <!-- closing content -->

	</div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

export default {
	data() {
		return {
			title: 'User - Vortex',
			user: {}
		}
	},
	methods: {
		logOut() {
			firebase.auth().signOut();
		},
	},
	watch: {
        title() {
            document.title = this.title;
        }
    },
	created() {

		document.title = this.title;

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