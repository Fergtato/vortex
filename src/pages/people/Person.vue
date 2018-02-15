<template>
  <div>

  	<dash-nav></dash-nav>

   <div class="fa-dash-content-wrapper uk-dark uk-preserve-color">
      
      <div>
        <div></div>
      </div>

      <div class="fa-dash-content">

        <div class="uk-grid-medium" uk-grid>

          <div class="uk-width-1-4">

            <img class="fa-poster" :src="`https://image.tmdb.org/t/p/w342${person.profile_path}`" alt="">

            <p>
              <span class="uk-text-bold">Also Known As</span>
              <br>
              <pre>{{ person.also_known_as }}</pre>
            </p>

            <p>
              <span class="uk-text-bold">Birthday</span>
              <br>
              {{ person.birthday }}
            </p>

            <p v-if="person.gender == 0">
              <span class="uk-text-bold">Gender</span>
              <br>
              Gender Not Set
            </p>

            <p v-if="person.gender == 1">
              <span class="uk-text-bold">Gender</span>
              <br>
              Female
            </p>

            <p v-else="person.gender == 2">
              <span class="uk-text-bold">Gender</span>
              <br>
              Male
            </p>


            <p>
              <span class="uk-text-bold">Place of Birth</span>
              <br>
              {{ person.place_of_birth }}
            </p>

          </div> <!-- closing uk width 1 4 -->

          <div class="uk-width-3-4">

            <h2 class="uk-margin-small-bottom">{{person.name}}</h2>

            <p>{{person.biography}}</p>

            <h3>Known For</h3>
            <!-- <pre>{{cast}}</pre> -->

            <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
        
              <div v-for="movie in cast.slice(0,5)">

                <poster :type="posterType" :media="movie"></poster>
                <!-- <p>{{movie.original_title}}</p> -->
                <!-- <p>yellow</p> -->

              </div>


            </div> <!-- closing uk grid small recommendations -->

            <router-link :to="`/person/${person.id}/alsoknownfor`" class="uk-button uk-button-link uk-margin-top">View All Movies </router-link>


          </div> <!-- closing uk width 3 4 -->

        </div> <!-- closing the grid  -->

      </div> <!-- closing content  -->

    </div> <!-- closing wrapper  -->   

 

  </div>
</template>

<script>
import firebase from 'firebase';
import axios from 'axios';
import tmdb from '../../mixins/tmdb.js';

export default {
  mixins: [tmdb],
  data () {
    return {
    	title: 'Person - Vortex',
      person: {},
      tmdbPersonUrl: '',
      tmdbPersonMovieCreditsUrl: '',
      tmdbPersonTvCreditsUrl: '',
      movie_credits: '',
      cast: '',
      crew: '',
      posterType: 'movie'	
    }
  },

  methods: {
  	apiCalls() {
  		axios.get(this.tmdbPersonUrl)
			.then((response) => {
				this.person = response.data;
				this.title = this.person.name + ' - Vortex';
		  });

      axios.get(this.tmdbPersonMovieCreditsUrl)
      .then((response) => {
        this.movie_credits = response.data.results;
        this.cast = response.data.cast;
        this.crew = response.data.crew;
      });

      // axios.get(this.tmdbPersonTvCreditsUrl)
      // .then((response) => {
      //   this.cast = response.data.cast;
      //   this.crew = response.data.crew;
      // });

	   },

  	setUrls(personId) {
  		this.tmdbPersonUrl = this.getTmdbPersonUrl(personId);
      this.tmdbPersonMovieCreditsUrl = this.getTmdbPersonMovieCreditsUrl(personId);
      this.tmdbPersonTvCreditsUrl = this.getTmdbPersonTvCreditsUrl(personId);
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

    console.log(this.tmdbPersonMovieCreditsUrl);
  },

  filters: {
  	truncate: function(string, value) {
  		return string.substring(0, value);
  	}
   	
  }
}
</script>