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
		                <a @click="search" class="uk-search-icon-flip" uk-search-icon></a>
		                <input v-model="searchQuery" v-on:keydown.enter.prevent='search' class="uk-search-input" type="search" placeholder="Search...">
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
			                        <li><router-link to="/movie/nowplaying">Now Playing</router-link></li>
			                        <li><router-link to="/movie/popular">Popular</router-link></li>
			                        <li><router-link to="/movie/toprated">Top Rated</router-link></li>
			                        <li><router-link to="/movie/upcoming">Upcoming</router-link></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>TV SHOWS</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><router-link to="/tv/airing_today">Airing</router-link></li>
			                      <li><router-link to="/tv/on_the_air">On Air</router-link></li>
			                      <li><router-link to="/tv/popular">Popular</router-link></li>
			                      <li><router-link to="/tv/top_rated">Top Rated</router-link></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>PEOPLE</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><router-link to="/person/popular">Popular</router-link></li>
			                    </ul>
			                  </div>
			              </div>
			            </li>

			            <li>
			              <a>LISTS</a>
			              <div uk-drop="offset: 0, mode: click">
			                  <div class="uk-card uk-card-body uk-card-secondary uk-padding-small">
			                    <ul class="uk-nav uk-dropdown-nav">
			                      <li><router-link to="/mylists">My Lists</router-link></li>
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
      loggedIn: false,
      searchQuery: ''
    }
  },
  methods: {
    search() {
      this.$router.push({ path: `/search/${this.searchQuery}` })
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