import toastr from 'toastr'

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const state = {
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
};

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
};

const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn
    },
    isPending: state => {
        return state.isPending
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};