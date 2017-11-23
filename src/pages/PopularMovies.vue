<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<div v-if="showLoader" class="fa-loader uk-padding">
	     		<h2 class="uk-margin">Loading...</h2>
	     	</div>

	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
				<!-- repeat for every movie -->
	        	<div v-for="movie in movies">
					
					
	        		<div class="fa-poster uk-inline-clip uk-transition-toggle">
	        			<router-link :to="`/movies/${movie.id}`">
	        			<img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">
	        			</router-link>
	        			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
	        				<ul class="uk-iconnav">
							    <li><a href="#" uk-icon="icon: plus"></a></li>
							    <li><a href="#" uk-icon="icon: heart"></a></li>
							    <li><a href="#" uk-icon="icon: bookmark"></a></li>
							    <li><a href="#" uk-icon="icon: bolt"></a></li>
							</ul>
	        			</div>
	        		</div>
	        		

	        	</div>

	        </div>

	        <div class="uk-container uk-text-center uk-padding">
	        	<button @click="showMore" class="uk-button uk-button-primary">Show More</button>
	        </div>

	        <!-- <ul>
	          <li v-for="movie in movies">
	            <router-link :to="`/movies/${movie.id}`">{{ movie.title }}</router-link>
	          </li>
	        </ul> -->

	        <pre>{{movies}}</pre>




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
        apiUrl: '',
        movies: [],
        page: 1,
        showLoader: true
      }
    },
    watch: {
      '$route' (to, from) {

      }
    },
    methods: {
    	showMore() {
    		this.page++;
    		this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=136727d529c2b6275946c6442cee626d&page=' + this.page;

			axios.get(this.apiUrl)
				.then((response) => {
				

				for (var i = 0; i < response.data.results.length; i++) {
					this.movies.push(response.data.results[i]);
				}
				

			});
    	}
    },
    created() {
      this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=136727d529c2b6275946c6442cee626d&page=' + this.page;
      console.log("created");
      axios.get(this.apiUrl)
      .then((response) => {
        this.movies = response.data.results;
        this.showLoader = false;
        console.log("Data Retrieved...");
      });

    }
  }
</script>