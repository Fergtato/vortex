<template>
  <div>
    
    <dash-nav></dash-nav>

    <div class="fa-dash-content-wrapper uk-dark uk-preserve-color">


        <div class="fa-dash-content">


          <h2>Top Rated Tv Shows</h2>

          <grid :type='gridType' :cat='gridCat'></grid>
        


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
        title: 'On Air Today - Vortex',
        gridType: 'tv',
        gridCat: 'top_rated'
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