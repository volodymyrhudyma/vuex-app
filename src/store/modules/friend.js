import toastr from 'toastr'
import moment from 'moment'
import axios from 'axios'

const FETCH_FRIENDS = "FETCH_FRIENDS";
const FETCH_START = "FETCH_START";
const ADD_FRIEND = "ADD_FRIEND";
const DELETE_FRIEND = "DELETE_FRIEND";

const state = {
    friends: [],
    isFriendsPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isFriendsPending = true;
    },
    [FETCH_FRIENDS] (state, friends) {
        state.friends = friends;
        state.isFriendsPending = false;
    },
    [ADD_FRIEND] (state, friend) {
        state.friends.push(friend);
    },
    [DELETE_FRIEND] (state, id) {
        let friend = state.friends.filter(friend => {
            return friend.id === id;
        })[0];
        state.friends.splice(state.friends.indexOf(friend), 1);
    },
};

const actions = {
    fetchFriends: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        context.commit(FETCH_START);
        return axios.get('http://localhost:1337/friend?userId=' + userId)
          .then(function (response) {                
            context.commit(FETCH_FRIENDS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    addFriend: (context, friendId) => {
        let data = {
            info: friendId,
            userId: context.rootState.auth.loggedUser.id
        };
        context.commit(FETCH_START);
        return axios.post('http://localhost:1337/friend/create', data)
          .then(function (response) {                
            context.commit(ADD_FRIEND, response.data[0]);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    deleteFriend: ({ dispatch, commit }, id) => {
        return axios.delete('http://localhost:1337/friend/destroy/' + id)
          .then(function (response) {                
            commit(DELETE_FRIEND, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
};

const getters = {
    allFriends: state => {
        return state.friends
    },
    isFriendsPending: state => {
        return state.isFriendsPending
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};