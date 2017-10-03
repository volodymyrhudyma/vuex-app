import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Users from './components/Users.vue'
import Comments from './components/Comments.vue'
import store from './store'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueRouter)
Vue.use(VueAxios, axios)

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