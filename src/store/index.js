import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import lang from './modules/lang'
import project from './modules/project'
import issue from './modules/issue'
import technology from './modules/technology'
import badge from './modules/badge'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
	modules: {
	    auth: auth,
	    lang: lang,
	    project: project,
	    issue: issue,
	    technology: technology,
	    badge: badge,
	}
});

export default store;