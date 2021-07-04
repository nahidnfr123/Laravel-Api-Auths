import Vue from "vue";
import Vuex from "vuex";
import auth from "./auth";

Vue.use(Vuex);

export default new Vuex.Store({
    strict: true,
    state: {
        errors: []
    },
    getters: {
        errors: state => state.errors
    },
    mutations: {
        setErrors(state, errors) {
            state.errors = errors;
        }
    },
    actions: {},
    modules: {
        auth
    }
});
