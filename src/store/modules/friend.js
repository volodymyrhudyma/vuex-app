import toastr from 'toastr'
import moment from 'moment'
import axios from 'axios'

const SEND_INVITATION = "SEND_INVITATION";
const DELETE_SENT_INVITATION = "DELETE_SENT_INVITATION";
const DELETE_ACCEPTED_INVITATION = "DELETE_ACCEPTED_INVITATION";
const FETCH_MY_INVITATIONS_START = "FETCH_MY_INVITATIONS_START";
const FETCH_MY_INVITATIONS = "FETCH_MY_INVITATIONS";
const FETCH_SENT_INVITATIONS = "FETCH_SENT_INVITATIONS";
const FETCH_ACCEPTED_INVITATIONS = "FETCH_ACCEPTED_INVITATIONS";
const ACCEPT_INVITATION  = "ACCEPT_INVITATION";

const state = {
    sentInvitations: [],
    acceptedInvitations: [],
    myInvitations: [],
    isMyInvitationsPending: false,
};

const mutations = {
    
    [FETCH_MY_INVITATIONS_START] (state) {
        state.isMyInvitationsPending = true;
    },
    [FETCH_MY_INVITATIONS] (stafte, myInvitations) {
        state.myInvitations = myInvitations;
        state.isMyInvitationsPending = false;
    },
    [FETCH_SENT_INVITATIONS] (stafte, sentInvitations) {
        state.sentInvitations = sentInvitations;
    },
    [FETCH_ACCEPTED_INVITATIONS] (stafte, acceptedInvitations) {
        state.acceptedInvitations = acceptedInvitations;
    },
    [SEND_INVITATION] (state, invitation) {
        state.sentInvitations.push(invitation);
    },
    [ACCEPT_INVITATION] (state, invitation) {
        // Add to accepted
        state.acceptedInvitations.push(invitation);

        // Remove from my
        let myInvitation = state.myInvitations.filter(myInvitation => {
            return myInvitation.id === invitation.id;
        })[0];
        state.myInvitations.splice(state.myInvitations.indexOf(myInvitation), 1);
    },
    [DELETE_SENT_INVITATION] (state, id) {
        let sentInvitation = state.sentInvitations.filter(sentInvitation => {
            return sentInvitation.id === id;
        })[0];
        state.sentInvitations.splice(state.sentInvitations.indexOf(sentInvitation), 1);
    },
    [DELETE_ACCEPTED_INVITATION] (state, id) {
        let acceptedInvitation = state.acceptedInvitations.filter(acceptedInvitation => {
            return acceptedInvitation.id === id;
        })[0];
        state.acceptedInvitations.splice(state.acceptedInvitations.indexOf(acceptedInvitation), 1);
    },
};

const actions = {
    fetchSentInvitations: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        return axios.get('http://localhost:1337/friend/invitations/sent?userId=' + userId)
          .then(function (response) {
            context.commit(FETCH_SENT_INVITATIONS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    fetchAcceptedInvitations: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        return axios.get('http://localhost:1337/friend/invitations/accepted?userId=' + userId)
          .then(function (response) {
            context.commit(FETCH_ACCEPTED_INVITATIONS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    fetchMyInvitations: (context) => {
        let userId = context.rootState.auth.loggedUser.id;
        context.commit(FETCH_MY_INVITATIONS_START);
        return axios.get('http://localhost:1337/friend/invitations?userId=' + userId)
          .then(function (response) {
            context.commit(FETCH_MY_INVITATIONS, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    sendInvitation: (context, friendId) => {
        let data = {
            to: friendId,
            userId: context.rootState.auth.loggedUser.id,
            from: context.rootState.auth.loggedUser.id,
        };
        return axios.post('http://localhost:1337/friend/create', data)
          .then(function (response) {                
            context.commit(SEND_INVITATION, response.data[0]);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    acceptInvitation: (context, id) => {
        let data = {
            id: id
        };
        return axios.post('http://localhost:1337/friend/invitations/accept', data)
          .then(function (response) {               
             context.commit(ACCEPT_INVITATION, response.data);
          })
          .catch(function (error) {
            context.dispatch('handleError', error, {root: true});
          });
    },
    deleteSentInvitation: ({ dispatch, commit }, id) => {
        return axios.delete('http://localhost:1337/friend/destroy/' + id)
          .then(function (response) {                
            commit(DELETE_SENT_INVITATION, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    deleteAcceptedInvitation: ({ dispatch, commit }, id) => {
        return axios.delete('http://localhost:1337/friend/destroy/' + id)
          .then(function (response) {                
            commit(DELETE_ACCEPTED_INVITATION, id);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
};

const getters = {
    sentInvitations: state => {
        return state.sentInvitations
    },
    acceptedInvitations: state => {
        return state.acceptedInvitations
    },
    myInvitations: state => {
        return state.myInvitations
    },
    isMyInvitationsPending: state => {
        return state.isMyInvitationsPending
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};