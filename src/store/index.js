import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import lang from './modules/lang'
import project from './modules/project'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: auth,
    lang: lang,
    project: project,
  }
});

export default store;