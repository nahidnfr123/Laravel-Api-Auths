<template>
    <v-app-bar
        app
        color="white"
        flat
    >
        <v-container class="py-0 fill-height">
            <v-avatar
                class="mr-10"
                color="grey darken-1"
                size="32"
            ></v-avatar>
            <router-link to="/">
                <v-btn text>Home</v-btn>
            </router-link>

            <template v-if="!user">
                <router-link to="/register">
                    <v-btn text>Register</v-btn>
                </router-link>
                <router-link to="/login">
                    <v-btn text>Login</v-btn>
                </router-link>
            </template>
            <template v-else>
                <router-link to="/people">
                    <v-btn text>Profile</v-btn>
                </router-link>
                <router-link to="/email-is-verified">
                    <v-btn text>Email Is Verified</v-btn>
                </router-link>
                <a href="#" @click.stop.prevent="logMeOut()">
                    <v-btn text>Log out</v-btn>
                </a>
            </template>


            <v-spacer></v-spacer>

            <v-responsive max-width="260">
                <div v-if="user">User: <span style="color:cornflowerblue; font-weight: bolder;">{{ user.name }}</span></div>
            </v-responsive>
        </v-container>
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

<style scoped>
a {
    padding: 0 !important;
    margin: 0 !important;
    box-sizing: content-box;
    display: block !important;
    text-decoration: none !important;
}
</style>
