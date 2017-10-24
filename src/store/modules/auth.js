import toastr from 'toastr'
import decode from 'jwt-decode'
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import store from '../index';
import axios from 'axios';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const SET_LOGGED_USER = "SET_LOGGED_USER";
const FETCH_USERS_START = "FETCH_USERS_START";
const FETCH_USERS = "FETCH_USERS";

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const CLIENT_ID = 'sYQrG53uT3yKGv3s4Ltgc8XZ67Li3I7l';
const CLIENT_DOMAIN = 'progrest.eu.auth0.com';
const REDIRECT = 'http://localhost:8000/#/callback';
const SCOPE = 'openid profile email';
const AUDIENCE = 'progrest.com';

let auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
});

let lock = new Auth0Lock(
    CLIENT_ID,
    CLIENT_DOMAIN
);

lock.on("authenticated", function(authResult) {
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
            console.log(error)
            return;
        }
        setIdToken(authResult.idToken);
        setAccessToken(authResult.accessToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token');
        store.dispatch('handleUser', profile);
    });
});

const state = {
    isLoggedIn: isLoggedIn(),
    loggedUser: null,
    isPending: false,
    users: null,
    isUsersFetching: false
};

const mutations = {
    [LOGIN] (state) {
        state.isPending = true;
    },
    [LOGIN_SUCCESS] (state, user) {
        state.isLoggedIn = true;
        state.loggedUser = user;
        state.isPending = false;
        window.location.href = '#/';
        toastr.success('You have been logged in');
    },
    [LOGOUT] (state) {
        state.isLoggedIn = false;
        state.loggedUser = null;
        window.location.href = '#/';
        toastr.success('You have been logged out');
    },
    [SET_LOGGED_USER] (state, user) {
        state.loggedUser = user;
        state.isPending = false;
    },
    [FETCH_USERS_START] (state, users) {
        state.isUsersFetching = true;
    },
    [FETCH_USERS] (state, users) {
        state.users = users;
        state.isUsersFetching = false;
    },
};

const actions = {
    login: ({ commit }, creds) => {
        commit(LOGIN);
        login();        
    },
    logout: ({ commit }) => {
        logout();
        commit(LOGOUT);
    },
    storeUser: ({ dispatch, commit }, payload) => {
        return axios.post('http://localhost:1337/user/create', payload)
            .then(function (response) {
                dispatch('fetchUser', response.data.email)
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
    handleUser: ({ dispatch, commit }, profile) => {
        return axios.get('http://localhost:1337/user?email=' + profile.email)
            .then(function (response) {
                if(!response.data.length) {
                    let data = {};
                    if(profile.sub.includes('auth0')) {
                        data = {
                            name: profile.name,
                            surname: profile.nickname,
                            email: profile.email,
                            avatar: profile.picture,
                            sub: profile.sub
                        };
                    }
                    if(profile.sub.includes('google-oauth2')) {
                        data = {
                            name: profile.given_name,
                            surname: profile.family_name,
                            email: profile.email,
                            avatar: profile.picture,
                            sub: profile.sub
                        };
                    }
                    dispatch('storeUser', data);
                } else {
                    dispatch('fetchUser', profile.email)
                }
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
    fetchUser: ({dispatch, commit}, email) => {
        return axios.get('http://localhost:1337/user?email=' + email)
            .then(function (response) {
                commit(LOGIN_SUCCESS, response.data[0]);
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
    fetchUserUsingIdToken: ({dispatch, commit}) => {
        commit(LOGIN);
        // Should be a helper function
        let token = localStorage.getItem('id_token');
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        let email = JSON.parse(window.atob(base64)).email;
        return axios.get('http://localhost:1337/user?email=' + email)
            .then(function (response) {
                commit(SET_LOGGED_USER, response.data[0]);
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
    fetchUsers: ({dispatch, commit}, email) => {
        commit(FETCH_USERS_START);
        return axios.get('http://localhost:1337/user/find')
            .then(function (response) {
                commit(FETCH_USERS, response.data);
            })
            .catch(function (error) {
                dispatch('handleError', error, {root: true});
            });
    },
};

const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn
    },
    loggedUser: state => {
        return state.loggedUser
    },
    isPending: state => {
        return state.isPending
    },
    users: state => {
        return state.users
    },
    isUsersFetching: state => {
        return state.isUsersFetching
    },
};

export function login() {
    auth.authorize({
        responseType: 'token id_token',
        redirectUri: REDIRECT,
        audience: AUDIENCE,
        scope: SCOPE
    });
}

export function logout() {
    clearIdToken();
    clearAccessToken();
}

export function requireAuth(to, from, next) {
    if (!isLoggedIn()) {
        next({
            path: '/',
            query: { redirect: to.fullPath }
        });
    } else {
        next();
    }
}

export function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

// Get and store id_token in local storage
export function setIdToken(idToken) {
    localStorage.setItem(ID_TOKEN_KEY, idToken);
}

export function setAccessToken(accessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export function isLoggedIn() {
    const idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
    const token = decode(encodedToken);
    if (!token.exp) { return null; }

    const date = new Date(0);
    date.setUTCSeconds(token.exp);

    return date;
}

function isTokenExpired(token) {
    const expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
}

export default {
    state,
    getters,
    actions,
    mutations
};