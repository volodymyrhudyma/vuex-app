import axios from 'axios';

export function setDefaultHeader((accessToken) => {
	axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
};