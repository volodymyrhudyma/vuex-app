import axios from 'axios'
import { 
    TEAM_ALL,
    TEAM_CREATE,
    TEAM_DELETE,
    TEAM_FIND,
} from '../../config/endpoints.js';

const FETCH_TEAMS = "FETCH_TEAMS";
const FETCH_START = "FETCH_START";
const STORE_TEAM = "STORE_TEAM";
const DELETE_TEAM = "DELETE_TEAM";
const FETCH_BY_ID_START = "FETCH_BY_ID_START";
const FETCH_BY_ID = "FETCH_BY_ID";

const state = {
    team: null,
    teams: null,
    isTeamsPending: false,
    isTeamPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isTeamsPending = true;
    },
    [FETCH_BY_ID_START] (state) {
        state.isTeamPending = true;
    },
    [FETCH_TEAMS] (state, teams) {
        state.teams = teams;
        state.isTeamsPending = false;
    },
    [STORE_TEAM] (state, team) {
        state.teams.push(team);   
    },
    [DELETE_TEAM] (state, id) {
        let team = state.teams.filter(team => {
            return team.id === id;
        })[0];
        state.teams.splice(state.teams.indexOf(team), 1);
    },
    [FETCH_BY_ID] (state, team) {
        state.team = team;
        state.isTeamPending = false;
    },
};

const actions = {
    fetchTeams: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        context.commit(FETCH_START);
        return axios.get(TEAM_ALL + '?userId=' + userId)
          .then(function (response) {                
            context.commit(FETCH_TEAMS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    storeTeam: (context, team) => {
        return axios.post(TEAM_CREATE, team)
          .then(function (response) {
            context.commit(STORE_TEAM, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    deleteTeam: (context, id) => {
        return axios.delete(TEAM_DELETE + '/' + id)
          .then(function (response) {                
            context.commit(DELETE_TEAM, id);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    fetchById: ({ dispatch, commit }, id) => {
        commit(FETCH_BY_ID_START);
        return axios.get(TEAM_FIND + '/' + id)
          .then(function (response) {
            commit(FETCH_BY_ID, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
};

const getters = {
    allTeams: state => {
        return state.teams;
    },
    team: state => {
        return state.team;
    },
    isTeamsPending: state => {
        return state.isTeamsPending;
    },
    isTeamPending: state => {
        return state.isTeamPending;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};