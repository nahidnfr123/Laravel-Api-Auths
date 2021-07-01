<template>
    <v-app-bar app>
        <v-tabs>
            <v-tab>
                <router-link to="/">Home</router-link>
            </v-tab>
            <template v-if="!user">
                <v-tab>
                    <router-link to="/register">Register</router-link>
                </v-tab>
                <v-tab>
                    <router-link to="/login">Login</router-link>
                </v-tab>

            </template>
            <template v-else>
                <v-tab>
                    <router-link to="/people">Profile</router-link>
                </v-tab>
                <v-tab>
                    <router-link to="/email-is-verified">Email Is Verified</router-link>
                </v-tab>
                <v-tab>
                    <a href="#" @click.stop.prevent="logMeOut()">Log out</a>
                </v-tab>
            </template>
        </v-tabs>
    </v-app-bar>
</template>

<script>
import {mapGetters, mapActions} from "vuex";


export default {
    name: "Navigation",
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        async logMeOut() {
            await this.logout();
            if (!this.authenticated) {
                await this.$router.push({
                    name: 'Home'
                })
            }
        }
    },
}
</script>
