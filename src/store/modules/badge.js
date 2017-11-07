import toastr from 'toastr'
import axios from 'axios'
import { 
    BADGE_ALL, 
    BADGE_CREATE, 
} from '../../config/endpoints.js';

const FETCH_BADGES = "FETCH_BADGES";
const FETCH_START = "FETCH_START";
const ADD_BADGE = "ADD_BADGE";

const state = {
    badges: [],
    types: [
        {
            name: 'One',
            children: [
                {
                    name: '1.1',
                },
                {
                    name: '1.2',
                },
                {
                    name: '1.3',
                }
            ],
        },
        {
            name: 'Two',
            children: [
                {
                    name: '2.1'
                }
            ],
        },
        {
            name: 'Three',
            children: [
                {
                    name: '3.1'
                }
            ],
        },
        {
            name: 'Four',
            children: [
                {
                    name: '4.1'
                }
            ],
        },
        {
            name: 'Five',
            children: [
                {
                    name: '5.1'
                }
            ],
        },
        {
            name: 'Six',
            children: [
                {
                    name: '6.1'
                }
            ],
        },
        {
            name: 'Seven',
            children: [
                {
                    name: '7.1'
                }
            ],
        },
        {
            name: 'Eight',
            children: [
                {
                    name: '9.1'
                }
            ],
        },
        {
            name: 'Nine',
            children: [
                {
                    name: '9.1'
                }
            ],
        },
        {
            name: 'Ten',
            children: [
                {
                    name: '10.1'
                }
            ],
        },
    ],
    isBadgesPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isBadgesPending = true;
    },
    [FETCH_BADGES] (state, badges) {
        state.badges = badges;
        state.isBadgesPending = false;
    },
    [ADD_BADGE] (state, payload) {
        state.badges.push(payload);
    },
};

const actions = {
    fetchBadges: ({ commit }) => {
        commit(FETCH_START);
        return axios.post(BADGE_ALL)
          .then(function (response) {
            commit(FETCH_BADGES, response.data);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
    addBadge: ({ dispatch, commit }, payload) => {
        return axios.post(BADGE_CREATE, payload)
          .then(function (response) {
            commit(ADD_BADGE, payload);
          })
          .catch(function (error) {
            dispatch('handleError', error, {root: true});
          });
    },
};

const getters = {
    allBadges: state => {
        return state.badges
    },
    allTypes: state => {
        return state.types
    },
    isBadgesPending: state => {
        return state.isBadgesPending
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};