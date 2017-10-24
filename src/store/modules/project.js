import toastr from 'toastr'
import moment from 'moment'
import axios from 'axios'

const FETCH_PROJECTS = "FETCH_PROJECTS";
const FETCH_START = "FETCH_START";
const TOGGLE_FAVORITE = "TOGGLE_FAVORITE";
const COMPLETE = "COMPLETE";
const STORE_PROJECT = "STORE_PROJECT";
const FETCH_BY_ID_START = "FETCH_BY_ID_START";
const FETCH_BY_ID = "FETCH_BY_ID";
const DELETE_PROJECT = "DELETE_PROJECT";

const state = {
    projects: [],
    isProjectsPending: false,
    project: null,
    isProjectPending: false,
    error: {}
};

const mutations = {
    [FETCH_START] (state) {
        state.isProjectsPending = true;
    },
    [FETCH_BY_ID_START] (state) {
        state.isProjectPending = true;
    },
    [FETCH_PROJECTS] (state, projects) {
        let currentDay = moment();
        projects.map(project => {
            let createdAt = moment(project.createdAt);
            let finishAt = moment(project.finishAt);
            let finishAtFormatted = finishAt.format('YYYY-MM-DD');
            let perfectProgress = Math.ceil((currentDay.diff(createdAt, "days")) / (finishAt.diff(createdAt, "days")) * 100);
            project.perfectProgress = perfectProgress;
            project.finishAt = finishAtFormatted;
        });
        state.projects = projects;
        state.isProjectsPending = false;
    },
    [TOGGLE_FAVORITE] (state, id) {
        let project = state.projects.filter(project => {
            return project.id === id;
        })[0];
        project.favorited = !project.favorited;        
    },
    [COMPLETE] (state, id) {
        let project = state.projects.filter(project => {
            return project.id === id;
        })[0];
        project.completed = true;        
    },
    [STORE_PROJECT] (state, project) {
        state.projects.push(project);   
    },
    [FETCH_BY_ID] (state, project) {
        project.leads = [
            {
                name: 'Volodymyr Hudyma',
                avatar: 'avatar',
                link: 'link'
            }
        ];
        project.members = [
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
        ];
        state.project = project;
        state.isProjectPending = false;
    },
    [DELETE_PROJECT] (state, id) {
        let project = state.projects.filter(project => {
            return project.id === id;
        })[0];
        state.projects.splice(state.projects.indexOf(project), 1);
    }    
};

const actions = {
    fetchProjects: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        context.commit(FETCH_START);
        return axios.get('http://localhost:1337/project?userId=' + userId)
          .then(function (response) {                
            context.commit(FETCH_PROJECTS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    storeProject: (context, project) => {
        project.userId = context.rootState.auth.loggedUser.id;
        return axios.post('http://localhost:1337/project/create', project)
          .then(function (response) {
            project.id = response.data.id;
            project.perfectProgress = 0;
            context.commit(STORE_PROJECT, project);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    toggleFavorite: ({ dispatch, commit }, id) => {
        return axios.post('http://localhost:1337/project/' + id + '/toggleFavorite')
          .then(function (response) {
            commit(TOGGLE_FAVORITE, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    complete: ({ dispatch, commit }, id) => {
        return axios.post('http://localhost:1337/project/' + id + '/complete')
          .then(function (response) {
            commit(COMPLETE, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    fetchById: ({ dispatch, commit }, id) => {
        commit(FETCH_BY_ID_START);
        return axios.get('http://localhost:1337/project/find/' + id)
          .then(function (response) {
            commit(FETCH_BY_ID, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    deleteProject: ({ dispatch, commit }, id) => {
        return axios.delete('http://localhost:1337/project/destroy/' + id)
          .then(function (response) {                
            commit(DELETE_PROJECT, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
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