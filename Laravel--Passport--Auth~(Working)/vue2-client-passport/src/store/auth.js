import router from "@/router/index.js";

import axios from "axios";
import {HTTP} from "@/plugins/http";
import {authHeader} from "@/helpers/authHeader";

export default {
    namespaced: true,
    state: {
        authenticated: !!localStorage.getItem('token'),
        user: null,
        error: null,
        isLoggedIn: !!localStorage.getItem('token'),
        token: localStorage.getItem('token')
    },
    getters: {
        authenticated(state) {
            return state.authenticated
        },
        user(state) {
            return state.user
        },
        error(state) {
            return state.error
        }
    },
    mutations: {
        SET_USER(state, value) {
            state.isLoggedIn = true;
            state.authenticated = true;
            return state.user = value
        },
        SET_ERROR(state, value) {
            return state.error = value
        },
        SET_ERROR_TO_NULL(state, value) {
            return state.error = value
        },
        LoginUser(state, data) {
            state.isLoggedIn = true;
            state.authenticated = true;
            state.user = data.user;
            let token = data.access_token;
            state.token = token;
            localStorage.setItem('token', token)
        },
        LogoutUser(state) {
            state.isLoggedIn = false;
            state.authenticated = false;
            state.token = localStorage.removeItem('token')
        },
        tokenStored(state) {
            state.token = localStorage.getItem('token')
        }
    },
    actions: {
        clearError({commit}) {
            commit('SET_ERROR_TO_NULL', null)
        },
        async register({dispatch, commit}, credentials) {
            let err = null;
            //await this.$http.post('/register', credentials)
            await HTTP.post('/api/register', credentials)
                .then((response) => {
                    commit('LoginUser', response.data);
                    // dispatch('snackbar/addSnack', {color: 'success', msg: 'Registration successful, please login.', snakbarType: 'Success'}, {root: true});
                })
                .catch(error => {
                    generateErrors({commit, dispatch}, error, err, "Error Logging in!", false);
                });
        },
        async login({dispatch, commit}, credentials) {
            let err = null;
            await HTTP.post('/api/login', credentials)
                .then((response) => {
                    //if (!err) return dispatch('me');
                    if (response.data) {
                        commit('LoginUser', response.data);
                    }
                }).catch(error => {
                    generateErrors({commit, dispatch}, error, err, "Error Logging in!", false);
                });
        },
        async logout({dispatch, commit}) {
            let err = null;
            await HTTP.post('/api/logout')
                .catch(error => {
                    generateErrors({commit, dispatch}, error, err, "Error Logging out!", false);
                });
            return dispatch('me');
        },
        me({dispatch, commit}) {
            const requestOptions = {
                method: 'GET',
                headers: authHeader()
            };
            return HTTP.get('/api/user', requestOptions).then((response) => {
                if (response.data) {
                    commit('SET_USER', response.data);
                }
            }).catch(() => {
                commit('SET_USER', null);
                commit('LogoutUser');
            });
        },
        async emailVerification({dispatch, commit, state}) {
            let err = null;
            await HTTP.post('/api/email/verification-notification', {
                user: state.user,
            }).then(() => {
                //dispatch('snackbar/addSnack', {color: 'success', msg: 'Email verification link successfully sent.', snakbarType: 'Success'}, {root: true});
            }).catch(error => {
                generateErrors({commit, dispatch}, error, err, "Error sending verification link.", false);
            });
        },
    }
}


function generateErrors({commit, dispatch}, error, err, msg = "Error! ", showSnackBar = false) {
    let snakbarType = 'Error!';
    if (error.response) {
        if (error.response.status == 422) {
            err = error.response.data.errors;
        } else if (error.response.status == 403) {
            err = error.response.data.message;
        } else if (error.response.status == 500) {
            err = error.response.data.message;
            // dispatch('snackbar/addSnack', {color: 'danger', msg: 'Backend server error!', snakbarType: snakbarType}, {root: true});
        } else if (error.response.status == 419) {
            err = error.response.data.message;
            // dispatch('snackbar/addSnack', {color: 'danger', msg: err, snakbarType: snakbarType}, {root: true});
        } else {
            err = msg + error;
        }
        commit('SET_ERROR', err);
        if (showSnackBar === true && error.response.status != 419) {
            // dispatch('snackbar/addSnack', {color: 'danger', msg: err, snakbarType: snakbarType}, {root: true});
        }
    } else {
        //dispatch('snackbar/addSnack', {color: 'danger', msg: error, snakbarType: snakbarType}, {root: true});
    }
}
