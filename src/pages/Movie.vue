<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">

			<div class="fa-movie-banner uk-background-cover" 
				:style="`background-image: url(https://image.tmdb.org/t/p/original${movie.backdrop_path});`">
				<div class="fa-banner-overlay"></div>
			</div>


	     	<div class="fa-dash-content">


			<div class="uk-grid-medium" uk-grid>

			    <div class="uk-width-1-4">
			        

	        		<img class="fa-poster fa-poster-pull" :src="`https://image.tmdb.org/t/p/w342${movie.poster_path}`" alt="">

	        		<div class="fa-poster-pull uk-padding uk-padding-remove-horizontal">

	        			
	        			<p>
	        				<span class="uk-text-bold">Status</span>
	        				<br>
	        				{{movie.status}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Release Date</span>
	        				<br>
	        				{{movie.release_date}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Original Language</span>
	        				<br>
	        				{{movie.original_language}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Runtime</span>
	        				<br>
	        				{{movie.runtime}} mins
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Budget</span>
	        				<br>
	        				${{movie.budget}}
	        			</p>
	        			<p>
	        				<span class="uk-text-bold">Revenue</span>
	        				<br>
	        				${{movie.revenue}}
	        			</p>
	        			<p class="uk-text-truncate">
	        				<span class="uk-text-bold">Homepage</span>
	        				<br>
	        				<a :href="`${movie.homepage}`" target="_blank">{{movie.homepage}}</a>
	        			</p>


	        		</div>


			    </div>

			    <div class="uk-width-3-4">
			        
					<h2 class="uk-margin-small-bottom">{{movie.title}}</h2>

					<span class="uk-margin-right">{{ movie.release_date | truncate('4') }}</span>

					<span v-for="genre in genres" class="uk-badge uk-margin-small-right">{{genre.name}}</span>

					<p>{{movie.overview}}</p>

					<button class="uk-button uk-button-primary uk-button" href="#trailer-modal" uk-toggle> 
						<span uk-icon="icon: play"></span> Play Trailer
					</button>
					
					<h3>Cast</h3>
					<ul class="uk-list">
					    <li v-for="person in cast.slice(0,8)">{{person.name}} - {{person.character}}</li>
					</ul>

					<h3>Crew</h3>
					<ul class="uk-list">
					    <li v-for="person in crew.slice(0,8)">{{person.name}} - {{person.job}}</li>
					</ul>

			    </div>

			</div>


			<div id="trailer-modal" class="uk-flex-top" uk-modal>
			    <div class="uk-modal-dialog uk-width-auto uk-margin-auto-vertical">
			        <button class="uk-modal-close-outside" type="button" uk-close></button>
			        <iframe :src="`//www.youtube.com/embed/${trailerKey}`" width="1120" height="630" frameborder="0" uk-video></iframe>
			    </div>
			</div>
			

			<h3>Cast</h3>
			<pre>{{cast}}</pre>
			<h3>Crew</h3>
			<pre>{{crew}}</pre>

			<!-- <h3>Videos</h3>
			<pre>{{videos}}</pre>
			<h3>Details</h3>
			<pre>{{movie}}</pre> -->

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
        apiUrl: 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '?api_key=136727d529c2b6275946c6442cee626d',
        videosUrl: 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '/videos?api_key=136727d529c2b6275946c6442cee626d',
        creditsUrl: 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '/credits?api_key=136727d529c2b6275946c6442cee626d',
        movie: {},
        genres: {},
        videos: {},
        cast: {},
        crew: {},
        trailerKey: ''
      }
    },
    methods: {
    	apiCalls() {
    		axios.get(this.apiUrl)
			.then((response) => {
				this.movie = response.data;
				this.genres = this.movie.genres;
			});

			axios.get(this.videosUrl)
	        .then((response) => {
	          this.videos = response.data.results;
	          this.trailerKey = this.videos[0].key;
	        });

	        axios.get(this.creditsUrl)
	        .then((response) => {
	          this.cast = response.data.cast;
	          this.crew = response.data.crew;
	        });
    	}
    },
    watch: {
      '$route' (to, from) {
        this.apiUrl = 'https://api.themoviedb.org/3/movie/' + to.params.movieId + '?api_key=136727d529c2b6275946c6442cee626d';
        this.videosUrl = 'https://api.themoviedb.org/3/movie/' + this.$route.params.movieId + '/videos?api_key=136727d529c2b6275946c6442cee626d';

        this.apiCalls();
        
      }
    },
    created() {

		this.apiCalls();
		//goodbye

    },
    filters: {
    	truncate: function(string, value) {
    		return string.substring(0, value);
    	}
    }
  }
</script>