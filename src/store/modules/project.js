import toastr from 'toastr'

const FETCH_PROJECTS = "FETCH_PROJECTS";
const FETCH_START = "FETCH_START";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
const STORE_PROJECT = "STORE_PROJECT";

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
                completed: false,
                progress: 15
            },
            {
                name: 'Project 2',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false,
                progress: 55
            },
            {
                name: 'Project 3',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false,
                progress: 0
            },
            {
                name: 'Project 4',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false,
                progress: 100
            },
            {
                name: 'Project 5',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 2
            },
            {
                name: 'Project 6',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 0
            },
            {
                name: 'Project 7',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false,
                progress: 0
            },
            {
                name: 'Project 8',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 20
            },
            {
                name: 'Project 9',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 0
            },
            {
                name: 'Project 10',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 0
            },
        ];
        state.isProjectsPending = false;
    },
    [TOGGLE_FAVORITE] (state, projectName) {
        let project = state.projects.filter(project => {
            return project.name.toLowerCase().includes(projectName.toLowerCase());
        })[0];
        project.favorited = !project.favorited;        
    },
    [TOGGLE_COMPLETED] (state, projectName) {
        let project = state.projects.filter(project => {
            return project.name.toLowerCase().includes(projectName.toLowerCase());
        })[0];
        project.completed = !project.completed;        
    },
    [STORE_PROJECT] (state, project) {
        state.projects.push(project);   
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
    storeProject: ({ commit }, project) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(STORE_PROJECT, project);
                resolve();
            }, 1000);
        });
    },
    toggleFavorite: ({ commit }, projectName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(TOGGLE_FAVORITE, projectName);
                resolve();
            }, 1000);
        });
    },
    toggleCompleted: ({ commit }, projectName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(TOGGLE_COMPLETED, projectName);
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