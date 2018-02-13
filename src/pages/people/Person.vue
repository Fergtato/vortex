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

            <img class="fa-poster fa-poster-pull" :src="`https://image.tmdb.org/t/p/w342${person.profile_path}`" alt="">

            <p>
              <span class="uk-text-bold">Also Known As</span>
              <br>
              {{ person.also_known_as }}
            </p>

            <p>
              <span class="uk-text-bold">Birthday</span>
              <br>
              {{ person.birthday }}
            </p>

            <p>
              <span class="uk-text-bold">Gender</span>
              <br>
              {{ person.gender }}
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

            <!-- <h3>Known For</h3>

            <div class="uk-grid-small uk-child-width-1-5@m uk-child-width-1-3@s" uk-grid>
        
              <div v-for="person in movie_credits.slice(0,5)">

                <poster :type="posterType" :media="movie"></poster>

              </div>

            </div> --> <!-- closing uk grid small recommendations -->

            <!-- <router-link :to="`/tv/${tvShow .id}/recommendations`" class="uk-button uk-button-link uk-margin-top">View All Recommendations</router-link> -->


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
      movie_credits: '',
      posterType: 'person'
      	
    }
  },

  methods: {
  	apiCalls() {
  		axios.get(this.tmdbPersonUrl)
			.then((response) => {
				this.person = response.data;
				this.title = this.person.name + ' - Vortex';
		  });
	   },

  	setUrls(personId) {
  		this.tmdbPersonUrl = this.getTmdbPersonUrl(personId);
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

    console.log('yellow');
  },

  filters: {
  	truncate: function(string, value) {
  		return string.substring(0, value);
  	}
   	
  }
}
</script>