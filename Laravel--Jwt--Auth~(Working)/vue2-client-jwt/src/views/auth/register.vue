<template>
    <div>
        <b-container>
            <form @submit.stop.prevent="register()">
                <h3 class="text-center mt-4">
                    Register
                </h3>

                <div v-if="errors && errors.length">
                    <div class="alert alert-danger text-center" role="alert">
                        {{ errors }}
                    </div>
                </div>

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="name">Name:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="name" placeholder="Enter your full name" type="text"
                                      id="name"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="username">Username:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="username" placeholder="Enter your username" id="username"></b-form-input>
                    </b-col>
                </b-row>

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="email">Email:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="email" placeholder="Enter your email" type="email"
                                      id="email"></b-form-input>
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

                <b-row class="my-1">
                    <b-col sm="12">
                        <label for="password_confirmation">Password confirmation:</label>
                    </b-col>
                    <b-col sm="12">
                        <b-form-input v-model="password_confirmation" type="password"
                                      id="password_confirmation"></b-form-input>
                    </b-col>
                </b-row>

                <b-button variant="primary" @click.stop.prevent="register()">Register</b-button>
            </form>
        </b-container>
    </div>
</template>

<script type="application/javascript">
import {mapGetters} from "vuex";

export default {
    data: () => ({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: [],
    }),

    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
            errorReg: 'auth/error',
        })
    },

    methods: {
        async register() {
            await this.$store.dispatch('auth/register', {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            });
            if (this.errorReg) {
                this.errors = this.errorReg
            } else {
                if (this.authenticated && this.user) {
                    await this.$router.push({
                        name: 'People'
                    })
                }
            }
        },
        clear() {
            this.name = ''
            this.email = ''
            this.username = ''
            this.password = ''
            this.password_confirmation = ''
            this.errors = []
        },
    },
}
</script>
