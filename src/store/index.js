import Vue from 'vue'
import Vuex from 'vuex'
import toastr from 'toastr'

Vue.use(Vuex)

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const SET_PAGE_NAME = "SET_PAGE_NAME";

// root state object.
// each Vuex instance is just a single state tree.
const state = {
    pageName: '',
    isLoggedIn: !!localStorage.getItem("token"),
    isPending: false
};

// 이거슨 reducer 같은 존재
const mutations = {
    [LOGIN] (state) {
        state.isPending = true;
    },
    [LOGIN_SUCCESS] (state) {
        state.isLoggedIn = true;
        state.isPending = false;
        toastr.success('You have been logged in');
    },
    [LOGOUT] (state) {
        state.isLoggedIn = false;
        toastr.success('You have been logged out');
    },
    [SET_PAGE_NAME] (state, pageName) {
        state.pageName = pageName;
    }
};

// actions are functions that causes side effects and can involve
// asynchronous operations.
const actions = {
    login: ({ commit }, creds) => {
        commit(LOGIN); // show spinner
        return new Promise(resolve => {
            setTimeout(() => {
                localStorage.setItem("token", "JWT");
                commit(LOGIN_SUCCESS);
                resolve();
            }, 3000);
        });
    },
    logout({ commit }) {
        localStorage.removeItem("token");
        commit(LOGOUT);
    },
    setPageName({ commit }, pageName) {
        commit(SET_PAGE_NAME, pageName);
    },
};

const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn
    },
    isPending: state => {
        return state.isPending
    },
    pageName: state => {
        return state.pageName
    }
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})