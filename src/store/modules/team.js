import axios from 'axios'

const FETCH_TEAMS = "FETCH_TEAMS";
const FETCH_START = "FETCH_START";
const STORE_TEAM = "STORE_TEAM";
const DELETE_TEAM = "DELETE_TEAM";

const state = {
    teams: null,
    isTeamsPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isTeamsPending = true;
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
};

const actions = {
    fetchTeams: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        context.commit(FETCH_START);
        return axios.get('http://localhost:1337/team?userId=' + userId)
          .then(function (response) {                
            context.commit(FETCH_TEAMS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    storeTeam: (context, team) => {
        console.log('team')
        console.log(team)
        return axios.post('http://localhost:1337/team/create', team)
          .then(function (response) {
            context.commit(STORE_TEAM, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    deleteTeam: (context, id) => {
        return axios.delete('http://localhost:1337/team/destroy/' + id)
          .then(function (response) {                
            context.commit(DELETE_TEAM, id);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
};

const getters = {
    allTeams: state => {
        return state.teams;
    },
    isTeamsPending: state => {
        return state.isTeamsPending;
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};