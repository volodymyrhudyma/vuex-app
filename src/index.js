import 'babel-polyfill'
import Vue from 'vue'
import App from './components/App.vue'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import ProjectList from './components/ProjectList.vue'
import IssueList from './components/IssueList.vue'
import TaskList from './components/TaskList.vue'
import TechList from './components/TechList.vue'
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
	{ path: '/issues', component: IssueList },
	{ path: '/tasks', component: TaskList },
	{ path: '/technologies', component: TechList },
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