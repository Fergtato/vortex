<template>
	<div>
		
		<home-nav></home-nav>

		
		<div class="uk-position-relative uk-visible-toggle uk-light" uk-slideshow="ratio: 8:3; autoplay: true; animation: fade">

		    <ul class="uk-slideshow-items">
		        <li>
		            <img src="../assets/pacificrim.jpg" alt="" uk-cover>
		        </li>
		        <li>
		            <img src="../assets/readyplayerone.jpg" alt="" uk-cover>
		            <div class="uk-position-center uk-position-small uk-text-center uk-light">
		                <h3 class="uk-margin-remove">Ready Player One</h3>
		                <br>
		                <button class="uk-button uk-button-primary">View Movie <span uk-icon="icon: arrow-right"></span></button>
		            </div>
		        </li>
		        <li>
		            <img src="../assets/blackpanther.jpg" alt="" uk-cover>
		        </li>
		    </ul>

		    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slideshow-item="previous"></a>
		    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slideshow-item="next"></a>

		</div>


		<router-link to="/movie/popular">
			<div class="uk-padding-small uk-background-primary uk-light">
				<h5 class="uk-margin-remove">Popular Movies <span uk-icon="icon: arrow-right"></span></h5>
			</div>
		</router-link>
		
		<div class="uk-slider-container uk-position-relative uk-visible-toggle uk-light" uk-slider="autoplay: true">

    		<ul class="uk-slider-items uk-child-width-1-6 uk-child-width-1-6@s uk-child-width-1-6@m">
				
		        <li v-for="movie in popularMovies">
		        	<router-link :to="`/movie/${movie.id}`">
			            <div class="uk-panel">
			                <div v-if="movie.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${movie.poster_path});background-size: cover;`">
								<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
							</div>

							<img v-else src="../assets/missingPoster.jpg" alt="">
			            </div>
		            </router-link>
		        </li>
				
		    </ul>

		    <a class="uk-position-center-left uk-position-small uk-hidden-hover" href="#" uk-slidenav-previous uk-slider-item="previous"></a>
		    <a class="uk-position-center-right uk-position-small uk-hidden-hover" href="#" uk-slidenav-next uk-slider-item="next"></a>

		</div>

		<div class="uk-padding-large uk-background-blend-multiply uk-background-secondary uk-background-cover uk-light" style="background-image: url(https://image.tmdb.org/t/p/original/pMpc6zRMV7CZ0HmkzLsv58HRWB9.jpg);" uk-grid>
			
			<div class="uk-width-expand@m">
            	<iframe width="720" height="405" src="https://www.youtube.com/embed/cSp1dM2Vj48?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
            </div>

            <div class="uk-width-2-5@m">
            	<h2 class="uk-text-primary">New Trailer</h2>
            	<h3 class="uk-margin-medium-bottom">Ready Player One</h3>

            	<p>When the creator of a popular video game system dies, a virtual contest is created to compete for his fortune.</p>
				
				<router-link to="/movie/333339">
	            	<button class="uk-button uk-button-primary">View Movie <span uk-icon="icon: arrow-right"></span></button>
	            </router-link>
            </div>

		</div>

		<div class="uk-padding-large uk-margin-remove" uk-grid>
			
			<div class="uk-width-expand@m">
				<h4>TV On the Air</h4>
				
				<div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
					
		        	<div v-for="tvShow in tvOnAir.slice(0,10)">

		        		<poster :type="tvPosterType" :media="tvShow" :showIcons="showPosterIcons"></poster>

		        	</div>

		        </div>
		    </div>

		    <div class="uk-width-1-4@m">
				<h4>Trending Celebrities</h4>

				<div uk-grid>
					<div v-for="person in popularPeople.slice(0,5)" class="uk-width-1-1@m uk-margin-remove-top uk-margin-small-bottom">
						<div uk-grid>
							<div class="uk-width-1-3@m">
								<img :src="`https://image.tmdb.org/t/p/w342${person.profile_path}`" alt="">
							</div>
							<div class="uk-width-2-3@m uk-padding-small">
								<p>
									{{person.name}}
								</p>
								<p>
									Popularity: <span class="uk-text-primary">{{Math.floor(person.popularity)}}</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				
		    </div>

		</div>

	</div>
</template>

<script>
import firebase from 'firebase';
import UIkit from 'uikit';
import axios from 'axios';
import tmdb from '../mixins/tmdb.js';

  export default {
  	mixins: [tmdb],
    data() {
      return {
      	title: 'Vortex',
      	popularMoviesUrl: '',
      	popularMovies: {},
      	tvOnAirUrl: '',
      	tvOnAir: {},
      	popularPeopleUrl: '',
      	popularPeople: {},
      	moviePosterType: 'movie',
      	tvPosterType: 'tv',
      	showPosterIcons: false
      }
    },
    methods: {
    	setUrls() {
    		this.popularMoviesUrl = this.getTmdbListUrl('movie', 'popular', 1);
    		this.tvOnAirUrl = this.getTmdbListUrl('tv', 'on_the_air', 1);
    		this.popularPeopleUrl = this.getTmdbListUrl('person', 'popular', 1);
    	},
    	apiCalls() {

	        axios.get(this.popularMoviesUrl)
	        .then((response) => {
	        	this.popularMovies = response.data.results;
	        });

	        axios.get(this.tvOnAirUrl)
	        .then((response) => {
	        	this.tvOnAir = response.data.results;
	        });

	        axios.get(this.popularPeopleUrl)
	        .then((response) => {
	        	this.popularPeople = response.data.results;
	        });

    	}
    },
    watch: {
    	'$route' (to, from) {

			this.setUrls();
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls();
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>