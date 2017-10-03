const SET_PAGE_NAME = "SET_PAGE_NAME";

const state = {
    pageName: '',
};

const mutations = {
    [SET_PAGE_NAME] (state, pageName) {
        state.pageName = pageName;
    }
};

const actions = {
    setPageName({ commit }, pageName) {
        commit(SET_PAGE_NAME, pageName);
    },
};

const getters = {
    pageName: state => {
        return state.pageName
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};