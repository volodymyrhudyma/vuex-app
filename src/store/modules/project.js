import toastr from 'toastr'

const FETCH_PROJECTS = "FETCH_PROJECTS";
const FETCH_START = "FETCH_START";

const state = {
    projects: null,
    isProjectsPending: false
};

const mutations = {
    [FETCH_START] (state, projects) {
        state.isProjectsPending = true;
    },
    [FETCH_PROJECTS] (state, projects) {
        state.projects = [
            {
                name: 'Project 1',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false
            },
            {
                name: 'Project 2',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false
            },
            {
                name: 'Project 3',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false
            },
            {
                name: 'Project 4',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false
            },
            {
                name: 'Project 5',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true
            },
        ];
        state.isProjectsPending = false;
    },
};

const actions = {
    fetchProjects: ({ commit }, projects) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_PROJECTS);
                resolve();
            }, 1000);
        });
    },
};

const getters = {
    allProjects: state => {
        return state.projects
    },
    isProjectsPending: state => {
        return state.isProjectsPending
    },
};

export default {
    state,
    getters,
    actions,
    mutations
};