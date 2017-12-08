export default {
	data() {
		return {
			apiBase: 'https://api.themoviedb.org/3/',
			apiKey: '136727d529c2b6275946c6442cee626d'
		}
	},
	methods: {
		createUrl(type, cat, page) {
			return this.apiBase + type + '/' + cat + '?api_key=' + this.apiKey + '&page=' + page;
		}
	},
 	created() {
    	// console.log("Mixin Worked!");
 	}
}