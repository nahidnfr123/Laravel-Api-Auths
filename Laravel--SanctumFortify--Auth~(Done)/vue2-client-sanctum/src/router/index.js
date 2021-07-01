import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '@/store';

Vue.use(VueRouter)

function preventAuthenticated(to, from, next) {
    const authenticated = store.getters["auth/authenticated"];
    const user = store.getters["auth/user"];
    if (authenticated && user) {
        next({
            path: '/',
        })
    } else {
        next()
    }
}

function requireAuthenticated(to, from, next) {
    const authenticated = store.getters["auth/authenticated"];
    const user = store.getters["auth/user"];

    if (to.name !== 'Login' && !authenticated || !user) next({path: '/login'})
    else {
        next();
    }
}

function requireEmailVerified(to, from, next) {
    const authenticated = store.getters["auth/authenticated"];
    const user = store.getters["auth/user"];

    if (to.name !== 'Login' && !authenticated || !user) {
        //checkUserDetails();
        next({path: '/login'});
    } else {
        if (user.email_verified_at != null) {
            next();
        } else {
            next({name: "EmailVerification"});
        }
    }
}

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "login" */ '../views/auth/login.vue'),
        beforeEnter: preventAuthenticated
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "register" */ '../views/auth/register.vue'),
        beforeEnter: preventAuthenticated
    },
    {
        path: '/people',
        name: 'People',
        component: () => import(/* webpackChunkName: "people" */ '../views/people.vue'),
        beforeEnter: requireAuthenticated
    },
    {
        path: '/email-verification',
        name: 'EmailVerification',
        component: () => import(/* webpackChunkName: "verify-email" */ '../views/auth/verify-email.vue'),
        beforeEnter: requireAuthenticated
    },
    {
        path: '/email-is-verified',
        name: 'EmailIsVerified',
        component: () => import(/* webpackChunkName: "verify-email" */ '../views/EmailVerified.vue'),
        beforeEnter: requireEmailVerified
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    saveScrollPosition: true,
    routes,
    linkActiveClass: "active",
    linkExactActiveClass: "exact-active",
})

export default router
