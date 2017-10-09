import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import lang from './modules/lang'
import project from './modules/project'
import issue from './modules/issue'
import technology from './modules/technology'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: true,
	modules: {
	    auth: auth,
	    lang: lang,
	    project: project,
	    issue: issue,
	    technology: technology,
	}
});

export default store;