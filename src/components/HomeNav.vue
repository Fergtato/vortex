<template>
<div>
	
	<div class="fa-top-nav uk-light">
		<div class="uk-container">
			
			<div class="uk-grid-collapse" uk-grid>
			    <div class="uk-width-1-5@m">
			        <h2 class="uk-margin-remove uk-text-left fa-vertical-align"><span class="fa-logo">V</span>ORTEX</h2>
			    </div>
			    <div class="uk-width-expand@m uk-text-center">
					<form class="uk-search uk-search-default uk-width-1-1 fa-vertical-align">
		                <router-link to="/search" class="uk-search-icon-flip" uk-search-icon></router-link>
		                <input class="uk-search-input" type="search" placeholder="Search...">
		            </form>
			    </div>
			    <div class="uk-width-1-5@m">
			    	<div v-if="!loggedIn" class="fa-vertical-align uk-text-right">
			    		<router-link to="/login" class="uk-button uk-button-link">LOG IN</router-link>
			    		<router-link to="/signup" class="uk-button uk-button-link uk-margin-left">SIGN UP</router-link>
		    		</div>
		    		<div v-else class="fa-vertical-align uk-text-right">
			    		<router-link to="/user" class="uk-button uk-button-link">{{user.displayName}}</router-link>
		    		</div>
			    </div>
			</div>

		</div>
	</div>

	<nav class="uk-navbar-container uk-margin uk-margin-remove-top">
        <div class="uk-container">
            <div class="uk-navbar">
                <div class="uk-navbar-left">

                    <ul class="uk-navbar-nav">

                        <li><router-link to="/">HOME</router-link></li>

			            <li><a>DISCOVER</a></li>

			            <li>
			              <a>MOVIES</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                        <li><a href="#">Now Playing</a></li>
			                        <li><router-link to="/movies/popular">Popular</router-link></li>
			                        <li><a href="#">Top Rated</a></li>
			                        <li><a href="#">Upcoming</a></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>TV SHOWS</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><a>Airing</a></li>
			                      <li><a>On Air</a></li>
			                      <li><a>Popular</a></li>
			                      <li><a>Top Rated</a></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>PEOPLE</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><a>Latest</a></li>
			                      <li><a>Popular</a></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>TRACKER</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><a>Calendar</a></li>
			                      <li><a>Watchlist</a></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>LISTS</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><a>My Lists</a></li>
			                      <li><a>Featured</a></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

                    </ul>

                </div>
            </div>
        </div>
    </nav>

</div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'auth',
  data() {
    return {
      user: {},
      loggedIn: false
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.user = user;
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
     });
  }
}
</script>