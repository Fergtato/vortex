<template>
  <div>

    <!-- <div uk-sticky>
	    <nav class="uk-navbar-container">
	      <div class="uk-container">
	        <div class="uk-navbar">

	          <div class="uk-navbar-left uk-visible@s">
	            <ul class="uk-navbar-nav">
	              <li>Logo</li>
	            </ul>
	          </div>

	          <div class="uk-navbar-left uk-hidden@s">
	              <a class="uk-navbar-toggle" uk-navbar-toggle-icon href="#"></a>
	          </div>

	          <div v-if="!loggedIn" class="uk-navbar-right">
	            <ul class="uk-navbar-nav">
	              <li><router-link to="/login">LOG IN</router-link></li>
	              <li><router-link to="/signup">SIGN UP</router-link></li>
	            </ul>
	          </div>
	          <div v-else class="uk-navbar-right">
	            <ul class="uk-navbar-nav">
	              <li><router-link to="/user">{{ user.displayName }}</router-link></li>
	            </ul>
	          </div>

	        </div>
	      </div>
	    </nav>
	</div> -->

	<div class="fa-dash-nav-top uk-light" uk-sticky>
		<div class="uk-padding uk-padding-remove-vertical">
			
			<div class="uk-grid-collapse" uk-grid>
			    <div class="uk-width-1-6@m">
			        <h2 class="uk-margin-remove uk-text-left fa-vertical-align-dash"><span class="fa-logo">V</span>ORTEX</h2>
			    </div>
			    <div class="uk-width-expand@m uk-text-center">
					<form class="uk-search uk-search-default uk-width-1-1 fa-vertical-align-dash">
		                <a @click="search" class="uk-search-icon-flip" uk-search-icon></a>
		                <input v-model="searchQuery" v-on:keydown.enter.prevent='search' class="uk-search-input" type="search" placeholder="Search...">
		            </form>
			    </div>
			    <div class="uk-width-1-5@m">
			    	<div v-if="!loggedIn" class="fa-vertical-align-dash uk-text-right">
			    		<router-link to="/login" class="uk-button uk-button-link">LOG IN</router-link>
			    		<router-link to="/signup" class="uk-button uk-button-link uk-margin-left">SIGN UP</router-link>
		    		</div>
		    		<div v-else class="fa-vertical-align-dash uk-text-right">
			    		<router-link to="/user" class="uk-button uk-button-link">{{user.displayName}}</router-link>
		    		</div>
			    </div>
			</div>

		</div>
	</div>


  <div class="fa-dash-nav-side uk-padding uk-padding-remove-right uk-light uk-preserve-color uk-visible@s">

    <div class="uk-width-1-2@s uk-width-4-5@m">
        <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>

            <li><router-link to="/">Home</router-link></li>

            <li uk-tooltip="title: Planned Feature"><a href="#">Discover</a></li>

            <li class="uk-parent">
                <a href="#">Movies</a>
                <ul class="uk-nav-sub">
                    <li><router-link to="/movie/nowplaying">Now Playing</router-link></li>
                    <li><router-link to="/movie/popular">Popular</router-link></li>
                    <li><router-link to="/movie/toprated">Top Rated</router-link></li>
                    <li><router-link to="/movie/upcoming">Upcoming</router-link></li>
                </ul>
            </li>

            <li class="uk-parent">
                <a href="#">TV Shows</a>
                <ul class="uk-nav-sub">
                    <li><router-link to="/tv/airing_today">Airing</router-link></li>
                    <li><router-link to="/tv/on_the_air">On Air</router-link></li>
                    <li><router-link to="/tv/popular">Popular</router-link></li>
                    <li><router-link to="/tv/top_rated">Top Rated</router-link></li>
                </ul>
            </li>

            <li class="uk-parent">
                <a href="#">People</a>
                <ul class="uk-nav-sub">
<!--                     <li><router-link to="/person/latest">Latest</router-link></li> -->
                    <li><router-link to="/person/popular">Popular</router-link></li>
                </ul>
            </li>

            <li class="uk-parent">
                <a href="#">Lists</a>
                <ul class="uk-nav-sub">
                    <li><router-link to="/mylists">My Lists</router-link></li>
                    <li><a href="#">Featured</a></li>
                </ul>
            </li>

        </ul>
    </div>

  </div>


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
