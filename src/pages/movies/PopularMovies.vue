<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<!-- <div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div> -->

	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <grid :type='gridType' :cat='gridCat'></grid>



	        <!-- <pre>{{movies}}</pre> -->




	     	</div>
	    </div>

	</div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../../mixins/tmdb.js';

  export default {
  	mixins: [tmdb],
    data() {
      return {
      	title: 'Popular Movies - Vortex',
        gridType: 'movie',
        gridCat: 'popular'
        // showLoader: true
      }
    },
    watch: {
        title() {
            document.title = this.title;
        }
    },
    created() {
		  document.title = this.title;
    }
  }
</script>