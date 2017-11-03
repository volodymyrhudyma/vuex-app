import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
import ProjectList from './components/ProjectList.vue'
import Project from './components/Project.vue'
import TechList from './components/TechList.vue'
import BadgeList from './components/BadgeList.vue'
import Profile from './components/Profile.vue'
import Friends from './components/Friends.vue'
import Callback from './components/Callback.vue'
import Team from './components/Team.vue'
import store from './store'
import VueRouter from 'vue-router'
import vuexI18n from 'vuex-i18n';
import { en } from './locales/en';
import { ua } from './locales/ua';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import axios from 'axios'

Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store);
Vue.use(VueMaterial)

Vue.i18n.add('en', en);
Vue.i18n.add('ua', ua);

const DEFAULT_LANGUAGE = 'en';

Vue.i18n.set(DEFAULT_LANGUAGE);

axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');

const routes = [
	{ 
		path: '/', 
		component: Home,

	},
	{ 
		path: '/projects', 
		component: ProjectList,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/project/:id', 
		component: Project,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/team/:id', 
		component: Team,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/technologies', 
		component: TechList,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/badges', 
		component: BadgeList,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/profile', 
		component: Profile,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/friends', 
		component: Friends,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
	{ 
		path: '/callback', 
		component: Callback,
		beforeEnter: (to, from, next) => {
	    	store.getters.isLoggedIn ? next() : next(false);
	    }
	},
];

const router = new VueRouter({
	routes
});

new Vue({
    el: '#app',
	router,
    store,    
    render: h => h(App)
});