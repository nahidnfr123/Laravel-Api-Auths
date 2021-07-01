<template>
    <v-form>
        <v-container>
            <form @submit.stop.prevent="login()">
                <h3 style="text-align: center; margin: 10px;">Login</h3>
                <v-text-field
                    v-model="username"
                    :error-messages="usernameErrors"
                    :counter="20"
                    label="Username"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                ></v-text-field>

                <v-text-field
                    :type="'password'"
                    v-model="password"
                    :error-messages="passwordErrors"
                    label="Password"
                    required
                    @input="$v.password.$touch()"
                    @blur="$v.password.$touch()"
                ></v-text-field>

                <v-btn class="mr-4" @click="login()">Login</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </form>
        </v-container>
    </v-form>
</template>

<script type="application/javascript">
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import {mapGetters} from "vuex";

export default {
    mixins: [validationMixin],

    validations: {
        username: {required, maxLength: maxLength(20)},
        password: {required,},
    },

    data: () => ({
        username: '',
        password: '',
        errors: [],
    }),

    computed: {
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.maxLength && errors.push('username must be at most 20 characters long')
            !this.$v.username.required && errors.push('username is required.')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },

    methods: {
        async login() {
            this.$v.$touch()
            await this.$store.dispatch('auth/login', {
                username: this.username,
                password: this.password,
            });
            if (this.authenticated && this.user) {
                await this.$router.push({
                    name:'People'
                })
            }
        },
        clear() {
            this.$v.$reset()
            this.username = ''
            this.password = ''
            this.errors = []
        },
    },
}
</script>
