import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from './components/Users.vue'
import Comments from './components/Comments.vue'
import store from './store'
import VueRouter from 'vue-router'
import vuexI18n from 'vuex-i18n';
import { en } from './locales/en';
import { de } from './locales/de';

Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', en);
Vue.i18n.add('de', de);

Vue.i18n.set('de');

const routes = [
	{ path: '/home', component: Home },
	{ path: '/login', component: Login },
	{ 
	 	path: '/users', 
	  	component: Users,
	  	beforeEnter: (to, from, next) => {
	  		store.state.auth.isLoggedIn ? next() : next(false);
	  	}
	},
	{ 
	 	path: '/comments', 
	  	component: Comments,
	  	beforeEnter: (to, from, next) => {
	  		store.state.auth.isLoggedIn ? next() : next(false);
	  	}
	},
]

const router = new VueRouter({
	routes
});

new Vue({
    el: '#app',
	router,
    store,    
    render: h => h(App)
});