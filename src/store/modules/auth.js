import toastr from 'toastr'
import auth0 from 'auth0-js';
import Auth0Lock from 'auth0-lock';

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";

const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'sYQrG53uT3yKGv3s4Ltgc8XZ67Li3I7l';
const CLIENT_DOMAIN = 'progrest.eu.auth0.com';
const REDIRECT = 'http://localhost:8000/callback';
const SCOPE = 'openid';

var auth = new auth0.WebAuth({
  clientID: CLIENT_ID,
  domain: CLIENT_DOMAIN
});

export function login() {
  auth.authorize({
    responseType: 'token id_token',
    redirectUri: REDIRECT,
    scope: SCOPE
  });
}

export function logout() {
  clearIdToken();
  clearAccessToken();
  console.log("logged out")
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

function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
}

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

const state = {
    isLoggedIn: false,
    isPending: false
};

// 이거슨 reducer 같은 존재
const mutations = {
    [LOGIN] (state) {
        state.isPending = true;
    },
    [LOGIN_SUCCESS] (state) {
        state.isLoggedIn = isLoggedIn();
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

export default {
    state,
    getters,
    actions,
    mutations
};