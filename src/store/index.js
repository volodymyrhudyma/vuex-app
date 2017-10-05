import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import lang from './modules/lang'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: auth,
    lang: lang,
  }
});

export default store;