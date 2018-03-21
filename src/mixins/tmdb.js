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
			console.log("cat:" + cat);
			return this.apiBase + type + '/' + cat + '?api_key=' + this.apiKey + '&page=' + page;
		},
		getSearchUrl(query, page) {
			console.log("query:" + query);
			return this.apiBase + 'search/multi?api_key=' + this.apiKey + '&query=' + query + '&page=' + page;
		},
		getTmdbMovieUrl(id) {
			return this.apiBase + 'movie/' + id + '?api_key=' + this.apiKey;
		},
		getTmdbMovieVideosUrl(id) {
			return this.apiBase + 'movie/' + id + '/videos?api_key=' + this.apiKey;
		},
		getTmdbMovieCreditsUrl(id) {
			return this.apiBase + 'movie/' + id + '/credits?api_key=' + this.apiKey;
		},
		getTmdbMovieRecomsUrl(id) {
			return this.apiBase + 'movie/' + id + '/recommendations?api_key=' + this.apiKey;
		},
		getTmdbMovieReviewsUrl(id) {
			return this.apiBase + 'movie/' + id + '/reviews?api_key=' + this.apiKey;
		},
		getTmdbTvUrl(id) {
			return this.apiBase + 'tv/' + id + '?api_key=' + this.apiKey;
		},
		getTmdbTvVideosUrl(id) {
			return this.apiBase + 'tv/' + id + '/videos?api_key=' + this.apiKey;
		},
		getTmdbTvCreditsUrl(id) {
			return this.apiBase + 'tv/' + id + '/credits?api_key=' + this.apiKey;
		},
		getTmdbTvRecomsUrl(id) {
			return this.apiBase + 'tv/' + id + '/recommendations?api_key=' + this.apiKey;
		},
		getTmdbTvViewAllSeasonsUrl(id) {
			return this.apiBase + 'tv/' + id + '/seasons?api_key=' + this.apiKey;
		},
		getTmdbTvSeasonUrl(id, seasonNum) {
			return this.apiBase + 'tv/' + id + '/season/' + seasonNum + '?api_key=' + this.apiKey;
		},
		getTmdbPersonUrl(id) {
			return this.apiBase + 'person/' + id + '?api_key=' + this.apiKey;
		},
		getTmdbPersonMovieCreditsUrl(id) {
			return this.apiBase + 'person/' + id + '/movie_credits?api_key=' + this.apiKey;
		},
		getTmdbPersonTvCreditsUrl(id) {
			return this.apiBase + 'person/' + id + '/tv_credits?api_key=' + this.apiKey;
		}
	},
 	created() {
    	axios.get("http://ipinfo.io")
        	.then((response) => {
        		this.region = response.data.country;
        });
 	}
}