import toastr from 'toastr'

const FETCH_BADGES = "FETCH_BADGES";
const FETCH_START = "FETCH_START";

const state = {
    badges: null,
    types: [
        {
            name: 'One',
            children: {
                name: '1.1',
                children: {
                    name: '1.1.1',
                    children: {
                        name: '1.1.1.1'
                    },
                },
            },
        },
        {
            name: 'Two',
            children: {
                name: '2.1'
            }
        },
        {
            name: 'Three',
            children: {
                name: '3.1'
            }
        },
        {
            name: 'Four',
            children: {
                name: '4.1'
            }
        },
        {
            name: 'Five',
            children: {
                name: '5.1'
            }
        },
        {
            name: 'Six',
            children: {
                name: '6.1'
            }
        },
        {
            name: 'Seven',
            children: {
                name: '7.1'
            }
        },
        {
            name: 'Eight',
            children: {
                name: '8.1'
            }
        },
        {
            name: 'Nine',
            children: {
                name: '9.1'
            }
        },
        {
            name: 'Ten',
            children: {
                name: '10.1'
            }
        },
    ],
    isBadgesPending: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isBadgesPending = true;
    },
    [FETCH_BADGES] (state, issues) {
        state.badges = [
            {
                name: 'One',
                type: 'one'
            },
            {
                name: 'Two',
                type: 'two'
            },
            {
                name: 'Three',
                type: 'three'
            },
            {
                name: 'Four',
                type: 'four'
            },
            {
                name: 'Five',
                type: 'five'
            },
            {
                name: 'Six',
                type: 'six'
            },
            {
                name: 'Seven',
                type: 'seven'
            },
            {
                name: 'Eight',
                type: 'eight'
            },
            {
                name: 'Nine',
                type: 'nine'
            },
            {
                name: 'Ten',
                type: 'ten'
            },
        ];
        state.isBadgesPending = false;
    },
};

const actions = {
    fetchBadges: ({ commit }, badges) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_BADGES);
                resolve();
            }, 1000);
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