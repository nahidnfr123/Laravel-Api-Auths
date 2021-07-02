import axios from 'axios';

function getToken() {
    let token = localStorage.getItem('token');
    if (token) {
        return {'Authorization': 'Bearer ' + token};
    } else {
        return {};
    }
}

export const HTTP = axios.create({
    baseURL: `http://localhost:8000`,
    withCredentials: true,
    headers: {
        Authorization: `Bearer {${getToken()}}`
    }
})


/*window.axios = require('axios');
const BaseUrl = 'http://localhost:8000';
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
window.axios.defaults.baseURL = BaseUrl;
window.axios.defaults.withCredentials = true;*/
