<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">
	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
				
				<!-- repeat for every movie -->
	        	<div v-for="movie in movies">
					
					<router-link to="/user">
	        		<div class="fa-poster uk-inline-clip uk-transition-toggle">
	        			<img :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">
	        			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
	        				<p class="uk-margin-remove">Hello</p>
	        			</div>
	        		</div>
	        		</router-link>

	        	</div>

	        </div>

	        <div class="uk-container uk-text-center uk-padding">
	        	<button class="uk-button uk-button-primary">Show More</button>
	        </div>

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
        apiUrl: '',
        movies: []
      }
    },
    watch: {
      '$route' (to, from) {

      }
    },
    created() {
      this.apiUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=136727d529c2b6275946c6442cee626d';
      console.log("created");
      axios.get(this.apiUrl)
      .then((response) => {
        this.movies = response.data.results;
        console.log("Data Retrieved...");
      });

    }
  }
</script>