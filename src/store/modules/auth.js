import toastr from 'toastr'
import decode from 'jwt-decode'
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'sYQrG53uT3yKGv3s4Ltgc8XZ67Li3I7l';
const CLIENT_DOMAIN = 'progrest.eu.auth0.com';
const REDIRECT = 'http://localhost:8000/#/callback';
const SCOPE = 'openid';
const AUDIENCE = 'progrest.com';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

let auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
});

let lock = new Auth0Lock(
    CLIENT_ID,
    CLIENT_DOMAIN
);

lock.on("authenticated", function(authResult) {
    // Use the token in authResult to getUserInfo() and save it to localStorage
    lock.getUserInfo(authResult.accessToken, function(error, profile) {
        if (error) {
            // Handle error
            console.log(error)
            return;
        }

        console.log('profile');
        console.log(profile);
        setAccessToken();
        setIdToken();
    });
});

const state = {
    isLoggedIn: isLoggedIn(),
    isPending: false
};

// 이거슨 reducer 같은 존재
const mutations = {
    [LOGIN] (state) {
        state.isPending = true;
    },
    [LOGIN_SUCCESS] (state) {
        state.isPending = false;
        toastr.success('You have been logged in');
    },
    [LOGOUT] (state) {
        state.isLoggedIn = false;
        toastr.success('You have been logged out');
    },
};

const actions = {
    login: ({ commit }, creds) => {
        commit(LOGIN); // show spinner
        return new Promise(resolve => {
            setTimeout(() => {
                login();
                commit(LOGIN_SUCCESS);
                resolve();
            }, 3000);
        });
    },
    logout({ commit }) {
        localStorage.removeItem("token");
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

export function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
}

function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
}

function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
    let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
    let accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
    let idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
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