<template>
    <v-form>
        <v-container>
            <form @submit.stop.prevent="register()">
                <h3 style="text-align: center; margin: 10px;">Register</h3>
                <v-text-field
                    v-model="name"
                    :error-messages="nameErrors"
                    :counter="20"
                    label="Name"
                    required
                    @input="$v.name.$touch()"
                    @blur="$v.name.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="username"
                    :error-messages="usernameErrors"
                    :counter="10"
                    label="Username"
                    required
                    @input="$v.username.$touch()"
                    @blur="$v.username.$touch()"
                ></v-text-field>

                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    label="E-mail"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
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

                <v-text-field
                    :type="'password'"
                    v-model="password_confirmation"
                    :error-messages="emailErrors"
                    label="Password Confirmation"
                    required
                    @input="$v.password_confirmation.$touch()"
                    @blur="$v.password_confirmation.$touch()"
                ></v-text-field>

                <v-btn class="mr-4" @click="register()">Register</v-btn>
                <v-btn @click="clear">clear</v-btn>
            </form>
        </v-container>
    </v-form>
</template>

<script type="application/javascript">
import {validationMixin} from 'vuelidate'
import {required, maxLength, email} from 'vuelidate/lib/validators'
import {mapGetters} from "vuex";
import router from "@/router";

export default {
    mixins: [validationMixin],

    validations: {
        name: {required, maxLength: maxLength(20)},
        username: {required, maxLength: maxLength(10)},
        email: {required, email},
        password: {required,},
        password_confirmation: {required,},
    },

    data: () => ({
        name: '',
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
        errors: [],
    }),

    computed: {
        nameErrors() {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.maxLength && errors.push('Name must be at most 20 characters long')
            !this.$v.name.required && errors.push('Name is required.')
            return errors
        },
        usernameErrors() {
            const errors = []
            if (!this.$v.username.$dirty) return errors
            !this.$v.username.maxLength && errors.push('username must be at most 10 characters long')
            !this.$v.username.required && errors.push('username is required.')
            return errors
        },
        emailErrors() {
            const errors = []
            if (!this.$v.email.$dirty) return errors
            !this.$v.email.email && errors.push('Must be valid e-mail')
            !this.$v.email.required && errors.push('E-mail is required')
            return errors
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.password.$dirty) return errors
            !this.$v.password.required && errors.push('Password is required')
            return errors
        },
        password_confirmationErrors() {
            const errors = []
            if (!this.$v.password_confirmation.$dirty) return errors
            !this.$v.password_confirmation.required && errors.push('password_confirmation is required')
            return errors
        },
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user',
        })
    },

    methods: {
        async register() {
            this.$v.$touch()
            await this.$store.dispatch('auth/register', {
                name: this.name,
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation,
            });
            if (this.authenticated && this.user) {
                await this.$router.push({
                    name:'People'
                })
            }
        },
        clear() {
            this.$v.$reset()
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
