//Import Vue
import Vue from 'vue';
import App from './App.vue';

//Import Router
import VueRouter from 'vue-router';
import router from './router';
Vue.use(VueRouter);

//Import Axios
import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

//Import Firebase
import VueFire from 'vuefire';
import './firebase';
Vue.use(VueFire);

//Import UiKit and Icons
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

import HomeNav from './components/HomeNav.vue';
Vue.component('home-nav', HomeNav);

import DashNav from './components/DashNav.vue';
Vue.component('dash-nav', DashNav);

import Grid from './components/Grid.vue';
Vue.component('grid', Grid);

import Poster from './components/Poster.vue';
Vue.component('poster', Poster);

import {store} from './store/store';

new Vue({
	router,
	store: store,
 	el: '#app',
 	render: h => h(App)
})
