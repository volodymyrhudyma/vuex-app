import Vue from 'vue'
import { GET_MUSICIANS } from '../../config/api.js'
import axios from 'axios'

const FETCH_MUSICIANS = "FETCH_MUSICIANS";
const START_FETCHING = "START_FETCHING";
const STOP_FETCHING = "STOP_FETCHING";

const state = {
    musicians: null,
    isFetching: false
};

const mutations = {
    [FETCH_MUSICIANS] (state, musicians) {
        state.musicians = musicians;
    },
    [START_FETCHING] (state) {
        state.isFetching = true;
    },
    [STOP_FETCHING] (state) {
        state.isFetching = false;
    }
};

const config = {
    auth: {
        username: 'User',
        password: 'Password'
    },
}

const actions = {
    fetchMusicians({ commit }, musicians) {
        commit("START_FETCHING")
        axios.get(GET_MUSICIANS, config)
            .then(response => {
                commit("FETCH_MUSICIANS", response.data);
                commit("STOP_FETCHING");
            }).catch(e => {
                console.log(e);
            });
    },
};

const getters = {
    allMusicians: state => {
        return state.musicians
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