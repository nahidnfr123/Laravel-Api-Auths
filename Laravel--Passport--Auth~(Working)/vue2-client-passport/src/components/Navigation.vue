<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Laravel-Vue2-JWT</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item>
                        <router-link to="/" exact>Home</router-link>
                    </b-nav-item>
                    <template v-if="authenticated && user">
                        <b-nav-item>
                            <router-link to="/people" exact>People</router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link to="/email-is-verified" exact>Email Verified</router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <a href="#" @click.stop.prevent="logMeOut()">Logout</a>
                        </b-nav-item>
                    </template>
                    <template v-else>
                        <b-nav-item>
                            <router-link to="/register" exact>Register</router-link>
                        </b-nav-item>
                        <b-nav-item>
                            <router-link to="/login" exact>Login</router-link>
                        </b-nav-item>
                    </template>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <!--<b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
                    </b-nav-form>-->

                    <!--<b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>-->

                    <b-nav-item-dropdown right v-if="authenticated && (user && user.length)">
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>{{ user.name }}</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#" @click.stop.prevent="logMeOut()">Logout Out</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    data() {
        return {}
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        async logMeOut() {
            await this.logout();
            if (!this.authenticated && !this.user) {
                await this.$router.push({
                    name: 'Login'
                })
            }
        }
    }
}
</script>

<style>
a {
    text-decoration: none !important;
}

.active,
.active:hover,
.exact-active:hover,
.exact-active {
    font-weight: bold;
    color: #42b983;
}
</style>
