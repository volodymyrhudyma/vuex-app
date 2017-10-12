import toastr from 'toastr'
import moment from 'moment'

const FETCH_PROJECTS = "FETCH_PROJECTS";
const FETCH_START = "FETCH_START";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const TOGGLE_COMPLETED = "TOGGLE_COMPLETED";
const STORE_PROJECT = "STORE_PROJECT";
const FETCH_BY_SLUG_START = "FETCH_BY_SLUG_START";
const FETCH_BY_SLUG = "FETCH_BY_SLUG";
const DELETE_PROJECT = "DELETE_PROJECT";

const state = {
    projects: null,
    isProjectsPending: false,
    project: null,
    isProjectPending: false
};

const mutations = {
    [FETCH_START] (state) {
        state.isProjectsPending = true;
    },
    [FETCH_BY_SLUG_START] (state) {
        state.isProjectPending = true;
    },
    [FETCH_PROJECTS] (state) {
        state.projects = [
            {
                name: 'Project 1',
                slug: 'project-1',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false,
                progress: 15,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 1),
                finishAt: moment().add('days', 5),
            },
            {
                name: 'Project 2',
                slug: 'project-2',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false,
                progress: 55,
                perfectProgress: 23,
                trend: 'up',
                createdAt: moment().subtract('days', 10),
                finishAt: moment().add('days', 15)
            },
            {
                name: 'Project 3',
                slug: 'project-3',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false,
                progress: 0,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 10),
                finishAt: moment().add('days', 12)
            },
            {
                name: 'Project 4',
                slug: 'project-4',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: false,
                completed: false,
                progress: 100,
                perfectProgress: 100,
                trend: 'equal',
                createdAt: moment().subtract('days', 22),
                finishAt: moment().add('days', 1)
            },
            {
                name: 'Project 5',
                slug: 'project-5',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 2,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 56),
                finishAt: moment().add('days', 55)
            },
            {
                name: 'Project 6',
                slug: 'project-6',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 0,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 18),
                finishAt: moment().add('days', 51)
            },
            {
                name: 'Project 7',
                slug: 'project-7',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false,
                progress: 0,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 50),
                finishAt: moment().add('days', 22)
            },
            {
                name: 'Project 8',
                slug: 'project-8',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 20,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 4),
                finishAt: moment().add('days', 43)
            },
            {
                name: 'Project 9',
                slug: 'project-9',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: true,
                progress: 0,
                perfectProgress: 23,
                trend: 'down',
                createdAt: moment().subtract('days', 2),
                finishAt: moment().add('days', 15)
            },
            {
                name: 'Project 10',
                slug: 'project-10',
                description: 'Description',
                avatar: 'https://placeimg.com/40/40/people/6',
                tags: [
                    'One', 'Two', 'Three'
                ],
                favorited: true,
                completed: false,
                progress: 22,
                // current day - created / finish - created * 100
                perfectProgress: moment().diff(moment().subtract('days', 10), 'days')/moment().add('days', 15).diff(moment().subtract('days', 10), 'days') * 100,
                trend: 'up',
                createdAt: moment().subtract('days', 10),
                finishAt: moment().add('days', 15)
            },
        ];
        state.isProjectsPending = false;
    },
    [TOGGLE_FAVORITE] (state, projectName) {
        let project = state.projects.filter(project => {
            return project.name.toLowerCase() === projectName.toLowerCase();
        })[0];
        project.favorited = !project.favorited;        
    },
    [TOGGLE_COMPLETED] (state, projectName) {
        let project = state.projects.filter(project => {
            return project.name.toLowerCase() === projectName.toLowerCase();
        })[0];
        project.completed = !project.completed;        
    },
    [STORE_PROJECT] (state, project) {
        state.projects.push(project);   
    },
    [FETCH_BY_SLUG] (state, slug) {
        state.project = {
            name: 'Project 10',
            slug: 'project-10',
            description: 'Description',
            avatar: 'https://placeimg.com/40/40/people/6',
            tags: [
                'One', 'Two', 'Three'
            ],
            favorited: true,
            completed: true,
            progress: 0,
            leads: [
                {
                    name: 'Volodymyr Hudyma',
                    avatar: 'avatar',
                    link: 'link'
                }
            ],
            members: [
                {
                    name: 'Member1',
                    avatar: 'avatar',
                    link: 'link'
                },
                {
                    name: 'Member2',
                    link: 'link',
                    avatar: 'avatar',
                }
            ]
        },
        state.isProjectPending = false;
    },
    [DELETE_PROJECT] (state, projectName) {
        let project = state.projects.filter(project => {
            return project.name.toLowerCase() === projectName.toLowerCase();
        })[0];
        state.projects.splice(state.projects.indexOf(project), 1);
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
    fetchBySlug: ({ commit }, slug) => {
        commit(FETCH_BY_SLUG_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_BY_SLUG, slug);
                resolve();
            }, 1000);
        });
    },
    deleteProject: ({ commit }, projectName) => {
        return new Promise(resolve => {
            setTimeout(() => {
                commit(DELETE_PROJECT, projectName);
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
    project: state => {
        return state.project
    },
    isProjectPending: state => {
        return state.isProjectPending
    },
    projectStats: state => {
        let completed = 0;
        state.projects.map(project => {
            project.completed ? completed++ : null;
        });
        let inProgress = state.projects.length - completed;
        return [completed, inProgress];
    },
    projectLabels: state => {
        let labels = ['Completed', 'In progress'];
        return labels;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};