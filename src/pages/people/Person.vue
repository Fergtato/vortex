<template>
  <div>

  	<dash-nav></dash-nav>

    {{ person.name }}

 

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
      	
    }
  },

  methods: {
  	apiCalls() {
  		axios.get(this.tmdbPersonUrl)
			.then((response) => {
				this.Person = response.data;
				this.title = this.Person.name + ' - Vortex';
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
  },

  filters: {
  	truncate: function(string, value) {
		return string.substring(0, value);
	},
   	
  }
}
</script>