import toastr from 'toastr'

const FETCH_TECHNOLOGIES = "FETCH_TECHNOLOGIES";
const FETCH_START = "FETCH_START";
const STORE_TECHNOLOGY = "STORE_TECHNOLOGY";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";

const state = {
    technologies: null,
    isTechnologiesPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isTechnologiesPending = true;
    },
    [FETCH_TECHNOLOGIES] (state, issues) {
        state.technologies = [
            {
                name: 'JavaScript',
                slug: 'javascript',
                favorited: false
            },
            {
                name: 'C#',
                slug: 'c#',
                favorited: true
            },
            {
                name: 'PHP',
                slug: 'php',
                favorited: false
            },
        ];
        state.isTechnologiesPending = false;
    },
    [STORE_TECHNOLOGY] (state, technology) {
        state.technologies.push(technology);
    },
    [TOGGLE_FAVORITE] (state, technologyName) {
        let technology = state.technologies.filter(technology => {
            return technology.name.toLowerCase().includes(technologyName.toLowerCase());
        })[0];
        technology.favorited = !technology.favorited;        
    },
};

const actions = {
    fetchTechnologies: ({ commit }, technologies) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_TECHNOLOGIES);
                resolve();
            }, 1000);
        });
    },
    storeTechnology: ({ commit }, technology) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(STORE_TECHNOLOGY, technology);
                resolve();
            }, 1000);
        });
    },
    toggleFavorite: ({ commit }, technologyName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(TOGGLE_FAVORITE, technologyName);
                resolve();
            }, 1000);
        });
    },
};

const getters = {
    allTechnologies: state => {
        return state.technologies
    },
    isTechnologiesPending: state => {
        return state.isTechnologiesPending
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};