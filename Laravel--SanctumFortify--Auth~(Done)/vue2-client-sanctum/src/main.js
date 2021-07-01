import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

//import http from './plugins/http.js'
//Vue.use(http)

Vue.config.productionTip = false

// Load data when main component loads ....
store.dispatch('auth/me').then(() => {
    new Vue({
        router,
        store,
        vuetify,
        render: h => h(App)
    }).$mount('#app')
});
