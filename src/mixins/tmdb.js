import axios from 'axios';

export default {
	data() {
		return {
			apiBase: 'https://api.themoviedb.org/3/',
			apiKey: '136727d529c2b6275946c6442cee626d',
			region: ''
		}
	},
	methods: {
		getTmdbListUrl(type, cat, page) {
			return this.apiBase + type + '/' + cat + '?api_key=' + this.apiKey + '&page=' + page + '&region=' + this.region;
		},
		getTmdbMovieUrl(id) {
			return this.apiBase + 'movie/' + id + '?api_key=' + this.apiKey;
		},
		getTmdbMovieVideosUrl(id) {
			return this.apiBase + 'movie/' + id + '/videos?api_key=' + this.apiKey;
		},
		getTmdbMovieCreditsUrl(id) {
			return this.apiBase + 'movie/' + id + '/credits?api_key=' + this.apiKey;
		}
	},
 	created() {
    	axios.get("http://ipinfo.io")
        	.then((response) => {
        		this.region = response.data.country;
        });
 	}
}