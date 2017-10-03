import Vue from 'vue'

const FETCH_COMMENTS = "FETCH_COMMENTS";
const START_FETCHING = "START_FETCHING";
const STOP_FETCHING = "STOP_FETCHING";

const state = {
    comments: null,
    isFetching: false
};

const mutations = {
    [FETCH_COMMENTS] (state, comments) {
        state.comments = comments;
    },
    [START_FETCHING] (state) {
        state.isFetching = true;
    },
    [STOP_FETCHING] (state) {
        state.isFetching = false;
    }
};

const actions = {
    fetchComments({ commit }, comments) {
        commit("START_FETCHING")
        Vue.axios.get("https://jsonplaceholder.typicode.com/comments").then((response) => {
            commit("FETCH_COMMENTS", response.data);
            commit("STOP_FETCHING");
        })
    },
};

const getters = {
    allComments: state => {
        return state.comments
    },
    isFetching: state => {
        return state.isFetching
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};