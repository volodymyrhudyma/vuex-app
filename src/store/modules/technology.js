import toastr from 'toastr'

const FETCH_TECHNOLOGIES = "FETCH_TECHNOLOGIES";
const FETCH_START = "FETCH_START";
const STORE_TECHNOLOGY = "STORE_TECHNOLOGY";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const DELETE_TECHNOLOGY = "DELETE_TECHNOLOGY";

const state = {
    technologies: null,
    isTechnologiesPending: false,
    availableColors: [
      '#f87979', 
      '#A1E7E8', 
      '#F7EDD2',
      '#4BC0C0',
      '#FFCE56',
      '#36A2EB'
    ]
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
                favorited: false,
                usageCount: 10,                
            },
            {
                name: 'C#',
                slug: 'c#',
                favorited: true,
                usageCount: 23,                
            },
            {
                name: 'PHP',
                slug: 'php',
                favorited: false,
                usageCount: 1,                
            },
            {
                name: 'Java',
                slug: 'java',
                favorited: false,
                usageCount: 76,                
            },
            {
                name: 'Other',
                slug: 'other',
                favorited: false,
                usageCount: 123,                
            },
        ];
        state.isTechnologiesPending = false;
    },
    [STORE_TECHNOLOGY] (state, technology) {
        state.technologies.push(technology);
    },
    [TOGGLE_FAVORITE] (state, technologyName) {
        let technology = state.technologies.filter(technology => {
            return technology.name.toLowerCase() === technologyName.toLowerCase();
        })[0];
        technology.favorited = !technology.favorited;        
    },
    [DELETE_TECHNOLOGY] (state, technologyName) {
        let technology = state.technologies.filter(technology => {
            return technology.name.toLowerCase() === technologyName.toLowerCase();
        })[0];
        state.technologies.splice(state.technologies.indexOf(technology), 1);
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
    deleteTechnology: ({ commit }, technologyName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(DELETE_TECHNOLOGY, technologyName);
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
    technologyStats: state => {
        return state.technologies.map(technology => {
            return technology.usageCount;
        });
    },
    technologyLabels: state => {
        return state.technologies.map(technology => {
            return technology.name;
        });
    },
    availableColors: state => {
        return state.availableColors
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};