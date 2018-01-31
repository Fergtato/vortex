<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<!-- <div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div> -->

	     	<div class="fa-dash-content">


	        <h2>Now Playing Movies</h2>

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
      	title: 'Now Playing Movies - Vortex',
        gridType: 'movie',
        gridCat: 'now_playing'
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