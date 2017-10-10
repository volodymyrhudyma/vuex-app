import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import ProjectList from './components/ProjectList.vue'
import Project from './components/Project.vue'
import IssueList from './components/IssueList.vue'
import TechList from './components/TechList.vue'
import BadgeList from './components/BadgeList.vue'
import Profile from './components/Profile.vue'
import store from './store'
import VueRouter from 'vue-router'
import vuexI18n from 'vuex-i18n';
import { en } from './locales/en';
import { ua } from './locales/ua';
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'

Vue.use(VueRouter)
Vue.use(vuexI18n.plugin, store);
Vue.use(VueMaterial)

Vue.i18n.add('en', en);
Vue.i18n.add('ua', ua);

const DEFAULT_LANGUAGE = 'en';

Vue.i18n.set(DEFAULT_LANGUAGE);

const routes = [
	{ path: '/', component: Home },
	{ path: '/login', component: Login },
	{ path: '/projects', component: ProjectList },
	{ path: '/projects/:slug', component: Project },
	{ path: '/issues', component: IssueList },
	{ path: '/technologies', component: TechList },
	{ path: '/badges', component: BadgeList },
	{ path: '/profile', component: Profile },
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