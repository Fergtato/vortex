<template>		
					
		<div class="fa-poster uk-inline-clip uk-transition-toggle">
			<router-link :to="`/${type}s/${media.id}`">
			<img v-if="media.poster_path" :src="`https://image.tmdb.org/t/p/w342${media.poster_path}`" alt="">
			<p v-else>No Poster</p>
			<!-- <p>{{media.title}}</p> -->
			</router-link>
			<div class="uk-transition-slide-bottom uk-position-bottom uk-overlay uk-overlay-primary">
				<ul class="uk-iconnav">
				    <!-- <li><a href="#" uk-icon="icon: plus"></a></li>
				    <li><a href="#" uk-icon="icon: heart"></a></li>
				    <li><a href="#" uk-icon="icon: bookmark"></a></li>
				    <li><a href="#" uk-icon="icon: bolt"></a></li> -->
				</ul>
			</div>
		</div>

</template>

<script>
	export default {
		props: ['media','type']
	}
</script>