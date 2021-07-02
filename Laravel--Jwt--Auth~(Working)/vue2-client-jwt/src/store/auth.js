import router from "@/router/index.js";

import axios from "axios";
import {HTTP} from "@/plugins/http";

export default {
    namespaced: true,
    state: {
        authenticated: false,
        user: null,
        error: null,
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
        SET_AUTHENTICATED(state, value) {
            return state.authenticated = value
        },
        SET_USER(state, value) {
            return state.user = value
        },
        SET_ERROR(state, value) {
            return state.error = value
        },
        SET_ERROR_TO_NULL(state, value) {
            return state.error = value
        }
    },
    actions: {
        clearError({commit}) {
            commit('SET_ERROR_TO_NULL', null)
        },
        async register({dispatch, commit}, credentials) {
            let err = null;
            //await this.$http.post('/register', credentials)
            await HTTP.get('/sanctum/csrf-cookie')
            await HTTP.post('/register', credentials)
                .then(() => {
                    if (!err) return dispatch('me'); // Login the user ...
                    // dispatch('snackbar/addSnack', {color: 'success', msg: 'Registration successful, please login.', snakbarType: 'Success'}, {root: true});
                })
                .catch(error => {
                    // generateErrors({commit, dispatch}, error, err, "Error Logging in!", false);
                });
        },
        async login({dispatch, commit}, credentials) {
            let err = null;
            await HTTP.get('/sanctum/csrf-cookie')//.then(response =>{console.log(response)})
            await HTTP.post('/login', credentials)
                .then(() => {
                    if (!err) return dispatch('me');
                }).catch(error => {
                    //generateErrors({commit, dispatch}, error, err, "Error Logging in!", false);
                });
        },
        async logout({dispatch, commit}) {
            let err = null;
            await HTTP.post('/logout')
                .catch(error => {
                    //generateErrors({commit, dispatch}, error, err, "Error Logging out!", false);
                });
            return dispatch('me');
        },
        me({dispatch, commit}) {
            return HTTP.get('/api/user').then((response) => {
                if (response.data) {
                    commit('SET_AUTHENTICATED', true);
                    commit('SET_USER', response.data);
                }
            }).catch(() => {
                commit('SET_AUTHENTICATED', false);
                commit('SET_USER', null);
            });
        },
        async emailVerification({dispatch, commit, state}) {
            let err = null;
            await HTTP.post('/email/verification-notification', {
                user: state.user,
            }).then(() => {
                //dispatch('snackbar/addSnack', {color: 'success', msg: 'Email verification link successfully sent.', snakbarType: 'Success'}, {root: true});
            }).catch(error => {
                //generateErrors({commit, dispatch}, error, err, "Error sending verification link.", false);
            });
        },
    }
}


