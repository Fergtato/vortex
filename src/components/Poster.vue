<template>		
					
		<div class="fa-poster uk-inline-clip uk-transition-toggle">
			<router-link :to="`/${type}s/${media.id}`">
			<!-- <img v-if="media.poster_path" :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`" alt=""> -->
			<div v-if="media.poster_path" :style="`background-image: url(https://image.tmdb.org/t/p/w342${media.poster_path});background-size: cover;`">
				<img class="fa-poster-filler" src="../assets/missingPoster.jpg" alt="">
			</div>
			<img v-else src="../assets/missingPoster.jpg" alt="">
			<!-- <p>{{media.title}}</p> -->
			</router-link>
			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
				<button @click="test" >Add To Favs</button>
				<!-- <ul class="uk-iconnav">
				    <li><a href="#" uk-icon="icon: plus"></a></li>
				    <li><a href="#" uk-icon="icon: heart"></a></li>
				    <li><a href="#" uk-icon="icon: bookmark"></a></li>
				    <li><a href="#" uk-icon="icon: bolt"></a></li>
				</ul> -->
			</div>
		</div>

</template>

<script>
	import { moviesRef } from '../firebase';

	export default {
		props: ['media','type'],
		methods: {
			test() {
				moviesRef.push(this.media);
			}
		}
	}
</script>