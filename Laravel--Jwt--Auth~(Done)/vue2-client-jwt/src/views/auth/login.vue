<template>
    <div>
        <b-container>
            <form @submit.stop.prevent="login()">
                <h3 class="text-center mt-4">
                    Login
                </h3>

                <div v-if="errors && errors.length">
                    <div class="alert alert-danger text-center" role="alert">
                        {{ errors }}
                    </div>
                </div>

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="username">Username:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="username" placeholder="Enter your username or email"
                                      id="username"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="password">Password:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="password" type="password" id="password"></b-form-input>
                    </b-col>
                </b-row>

                <b-button variant="primary" @click.stop.prevent="login()">Login</b-button>
            </form>
        </b-container>
    </div>
</template>

<script type="application/javascript">
import {mapGetters} from "vuex";
import {HTTP} from "@/plugins/http";

export default {
    data: () => ({
        username: '',
        password: '',
        errors: [],
        users: [],
    }),
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },
    methods: {
        async login() {
            await this.$store.dispatch('auth/login', {
                username: this.username,
                password: this.password,
            });
            if (this.authenticated && this.user) {
                await this.$router.push({
                    name: 'People'
                })
            }
        },
        clear() {
            this.username = ''
            this.password = ''
            this.errors = []
        },
    },
}
</script>
