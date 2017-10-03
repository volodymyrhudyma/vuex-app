import Vue from 'vue'

const FETCH_PRODUCTS = "FETCH_PRODUCTS";
const START_FETCHING = "START_FETCHING";
const STOP_FETCHING = "STOP_FETCHING";

const state = {
    products: null,
    isFetching: false
};

const mutations = {
    [FETCH_PRODUCTS] (state, products) {
        state.products = products;
    },
    [START_FETCHING] (state) {
        state.isFetching = true;
    },
    [STOP_FETCHING] (state) {
        state.isFetching = false;
    }
};

const actions = {
    fetchProducts({ commit }, products) {
        commit("START_FETCHING")
        Vue.axios.get("https://jsonplaceholder.typicode.com/posts").then((response) => {
            commit("FETCH_PRODUCTS", response.data);
            commit("STOP_FETCHING");
        })
    },
};

const getters = {
    allProducts: state => {
        return state.products
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