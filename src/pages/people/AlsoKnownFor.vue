<template>
	<div>
		
		<dash-nav></dash-nav>

		<div class="fa-dash-content-wrapper uk-dark uk-preserve-color">



	     	<div class="fa-dash-content">

				<h3>{{ person.name }} - Also Known For</h3>

				<hr>				
				
				<div v-if="movie_credits.cast.length > 0">
					<h4>Movies as cast</h4>
					<table class="uk-table uk-table-small uk-table-divider">
						<thead>
							<tr>
								<td>Year</td>
								<td>Title</td>
								<td>Character</td>
							</tr>
						</thead>
						
						<tbody v-for="movie in movie_credits.cast">
							<td>{{ movie.release_date.slice(0,4)}}</td>
							<td>{{ movie.title }}</td>
							<td>{{ movie.character }}</td>
						</tbody>
					</table>
				</div>	


				
				<div v-if="movie_credits.crew.length > 0">
					<h4>Movies as crew</h4>
					<table class="uk-table uk-table-small uk-table-divider">

						<thead>
							<tr>
								<td>Title</td>
								<td>Department</td>
								<td>Job</td>
							</tr>
						</thead>
						
						<tbody v-for="movie in movie_credits.crew">
							<td>{{ movie.title }}</td>
							<td>{{ movie.department }}</td>
							<td>{{ movie.job }}</td>
						</tbody>				
					</table>
				</div>	


				
				<div v-if="tv_credits.cast.length > 0">
					<h4>TV Shows as cast</h4>
					<table class="uk-table uk-table-small uk-table-divider">
						<thead>
							<tr>
								<td>Year</td>
								<td>Name</td>
								<td>Episodes</td>
								<td>Character</td>
							</tr>
						</thead>
						
						<tbody v-for="tvShow in tv_credits.cast">
							<tr>
								<td>{{ tvShow.first_air_date.slice(0,4) }}</td>
								<td>{{ tvShow.name }}</td>
								<td>{{ tvShow.episode_count }}</td>
								<td>{{ tvShow.character }}</td>
							</tr>
						</tbody>
					</table>
				</div>	


				
				<div v-if="tv_credits.cast.length > 0">
					<h4>TV Shows as crew</h4>
					<table class="uk-table uk-table-small uk-table-divider">
						<thead>
							<tr>
								<td>Name</td>
								<td>Department</td>
								<td>Jobs</td>
							</tr>
						</thead>
						
						<tbody v-for="tvShow in tv_credits.cast">
							<tr>
								<td>{{ tvShow.name }}</td>
								<td>{{ tvShow.department }}</td>
								<td>{{ tvShow.job }}</td>
							</tr>
						</tbody>
					</table>
				</div>	



				<!-- <div v-if="movie_credits.crew.length > 0">
					<h4>Movies as crew</h4>
					
					<ul class="uk-list uk-list-divider">
						<li v-for="movie in movie_credits.crew">
			                {{ movie.title }} - {{ movie.department }} - {{ movie.job }}
			            </li>
					</ul>
				</div> -->
				
				<!-- <div v-if="tv_credits.cast.length > 0">
					<h4>TV Shows as cast</h4>
					
					<ul class="uk-list uk-list-divider">
						<li v-for="tvShow in tv_credits.cast">
			                {{ tvShow.first_air_date.slice(0,4) }} - {{ tvShow.name }} : {{ tvShow.episode_count }}
			            </li>
					</ul>
				</div> -->
				
				<!-- <div v-if="tv_credits.crew.length > 0">
					<h4>TV Shows as crew</h4>
					
					<ul class="uk-list uk-list-divider">
						<li v-for="tvShow in tv_credits.crew">
			                {{ tvShow.name }} - {{ tvShow.department }} - {{ tvShow.job }}
			            </li>
					</ul>
				</div> -->

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
      	title: 'Also Known For - Vortex',
      	tmdbPersonUrl: '',
        tmdbPersonMovieCreditsUrl: '',
        tmdbPersonTvCreditsUrl: '',
        person: {},
        movie_credits: {},
        tv_credits: {}
      }
    },
    methods: {
    	setUrls(personId) {
    		this.tmdbPersonUrl = this.getTmdbPersonUrl(personId);
    		this.tmdbPersonMovieCreditsUrl = this.getTmdbPersonMovieCreditsUrl(personId);
    		this.tmdbPersonTvCreditsUrl = this.getTmdbPersonTvCreditsUrl(personId);
    	},
    	apiCalls() {

    		axios.get(this.tmdbPersonUrl)
			.then((response) => {
				this.person = response.data;
				this.name = this.person.name + ' - Vortex';
			});

	        axios.get(this.tmdbPersonMovieCreditsUrl)
	        .then((response) => {
	        	this.movie_credits = response.data;
	        });

	        axios.get(this.tmdbPersonTvCreditsUrl)
	        .then((response) => {
	        	this.tv_credits = response.data;
	        });

    	}
    },
    watch: {
		'$route' (to, from) {

			this.setUrls(to.params.personId);
			this.apiCalls();

		},
	    title() {
			document.title = this.title;
	    }
    },
    created() {

    	this.setUrls(this.$route.params.personId);
		this.apiCalls();

		document.title = this.title;

    }
  }
</script>