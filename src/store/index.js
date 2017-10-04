import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import page from './modules/page'
import musician from './modules/musician'
import comment from './modules/comment'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth: auth,
    page: page,
    musician: musician,
    comment: comment
  }
});

export default store;