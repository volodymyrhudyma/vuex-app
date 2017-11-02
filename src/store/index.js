import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import lang from './modules/lang'
import project from './modules/project'
import issue from './modules/issue'
import technology from './modules/technology'
import badge from './modules/badge'
import team from './modules/team'
import toastr from 'toastr'

Vue.use(Vuex);

const THROW_ERROR = "THROW_ERROR";

const state = {
    error: {},
};

const mutations = {
	[THROW_ERROR] (state, error) {
        let html = 'Error!';
        if(typeof error.response.data === 'object') {
            if(error.response.data.message) {
                state.error = {
                    statusCode: error.response.status,
                    message: error.response.data.message
                };
                html = state.error.message;
            } else {
                state.error = {
                    statusCode: error.response.status,
                    invalidAttributes: Object.keys(error.response.data.invalidAttributes),
                    reason: error.response.data.reason
                };
                html = state.error.reason + ": <br /> " + state.error.invalidAttributes.join(", ");
            }

            if(error.response.data.status === 401) {
                console.log('should be logged out')
            }
        } else {
            state.error = {
                statusCode: error.response.status,
                reason: error.response.data
            };
            html = state.error.reason;
        }
        toastr.error(html);
    },    
};

const actions = {
	handleError: ({ commit }, error) => {
        commit(THROW_ERROR, error);
    },    
};

const getters = {
	error: state => {
        return state.error
    },
};

const store = new Vuex.Store({
    strict: true,
    state,
    mutations,
    actions,
    getters,
	modules: {
	    auth: auth,
	    lang: lang,
	    project: project,
	    issue: issue,
	    technology: technology,
        badge: badge,
	    team: team,
	}
});

export default store;