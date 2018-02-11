<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<!-- <div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div> -->

	     	<div class="fa-dash-content">


	        <pre>Searched: {{query}}</pre>

	        <grid :type='gridType' :cat='gridCat' :query='query'></grid>



	        <!-- <pre>{{movies}}</pre> -->




	     	</div>
	    </div>

	</div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../mixins/tmdb.js';

  export default {
  	mixins: [tmdb],
    data() {
      return {
      	title: 'Search - Vortex',
        gridType: 'movie',
        gridCat: 'search',
        query: {}
      }
    },
    watch: {
      '$route' (to, from) {

        this.query = this.$route.params.query;

      },
      title() {
        document.title = this.title;
      }
    },
    created() {
		  document.title = this.title;

      this.query = this.$route.params.query;
      this.$store.commit('clearSearch');
    }
  }
</script>