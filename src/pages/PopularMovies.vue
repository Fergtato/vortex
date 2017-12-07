<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<!-- <div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div> -->

	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <!-- <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
	        	<div v-for="movie in popularMoviesGrid.movies">

	        		<poster :type="type" :media="movie"></poster>

	        	</div>

	        </div> -->

	        <grid :type='gridType' :cat='gridCat'></grid>



	        

	        <!-- <ul>
	          <li v-for="movie in movies">
	            <router-link :to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
	          </li>
	        </ul> -->

	        <!-- <pre>{{movies}}</pre> -->




	     	</div>
	    </div>

	</div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';

  export default {
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