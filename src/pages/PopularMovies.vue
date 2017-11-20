<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">
	     	<div class="fa-dash-content">


	        <h2>Popular Movies</h2>

	        <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
	        	<div v-for="movie in movies">
	        		<div class="uk-inline-clip uk-transition-toggle">
	        			<img class="fa-poster" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">
	        			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary fa-poster-overlay">
	        				<p class="uk-h4 uk-margin-remove">Hello</p>
	        			</div>
	        		</div>
	        	</div>
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