import toastr from 'toastr'
import decode from 'jwt-decode'
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';
import store from '../index';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';
const CLIENT_ID = 'sYQrG53uT3yKGv3s4Ltgc8XZ67Li3I7l';
const CLIENT_DOMAIN = 'progrest.eu.auth0.com';
const REDIRECT = 'http://localhost:8000/#/callback';
const SCOPE = 'openid';
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
        store.commit(LOGIN_SUCCESS);
    });
});

const state = {
    isLoggedIn: isLoggedIn(),
    isPending: false
};

const mutations = {
    [LOGIN] (state) {
        state.isPending = true;
    },
    [LOGIN_SUCCESS] (state) {
        state.isLoggedIn = true;
        state.isPending = false;
        window.location.href = '#/';
        toastr.success('You have been logged in');
    },
    [LOGOUT] (state) {
        state.isLoggedIn = false;
        toastr.success('You have been logged out');
    },
};

const actions = {
    login: ({ commit }, creds) => {
        commit(LOGIN);
        login();        
    },
    logout({ commit }) {
        logout();
        commit(LOGOUT);
    },
};

const getters = {
    isLoggedIn: state => {
        return state.isLoggedIn
    },
    isPending: state => {
        return state.isPending
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