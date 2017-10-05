import Vue from 'vue'
import toastr from 'toastr'

const SET_LANGUAGE = "SET_LANGUAGE";

const state = {
    language: null
};

// 이거슨 reducer 같은 존재
const mutations = {
    [SET_LANGUAGE] (state, language) {
        state.language = language;
        Vue.i18n.set(language);
    },
};

const actions = {
    setLanguage: ({ commit }, language) => {
        commit(SET_LANGUAGE, language);
    },
};

const getters = {
    getLanguage: state => {
        return state.language
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};