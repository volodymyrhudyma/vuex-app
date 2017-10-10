const FETCH_PROFILE = "FETCH_PROFILE";
const FETCH_START = "FETCH_START";

const state = {
    profile: null,
    isProfileFetching: false,
};

const mutations = {
    [FETCH_START] (state) {
        state.isProfileFetching = true;
    },
    [FETCH_PROFILE] (state, issues) {
        state.profile = {
            name: 'Volodymyr',
            surname: 'Hudyma',
            email: 'volodymyrhudyma@gmail.com',
            bio: 'Biography',
            city: 'Rzeszow',
            followers: [
                {
                    name: 'John',
                    avatar: 'avatar'
                },
                {
                    name: 'Pedro',
                    avatar: 'avatar'
                },
                {
                    name: 'Volodymyr',
                    avatar: 'avatar'
                },
                {
                    name: 'Andrew',
                    avatar: 'avatar'
                },
                {
                    name: 'Pavlo',
                    avatar: 'avatar'
                },
                {
                    name: 'Richard',
                    avatar: 'avatar'
                }
            ],
            following: []
        };
        state.isProfileFetching = false;
    },
};

const actions = {
    fetchProfile: ({ commit }) => {
        commit(FETCH_START);
        return new Promise(resolve => {
            setTimeout(() => {
                commit(FETCH_PROFILE);
                resolve();
            }, 1000);
        });
    },
};

const getters = {
    profile: state => {
        return state.profile
    },
    isProfileFetching: state => {
        return state.isProfileFetching
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};