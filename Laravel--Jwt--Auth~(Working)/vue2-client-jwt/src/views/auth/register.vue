<template>
    <div>
        Register
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
            if (this.authenticated && this.user) {
                await this.$router.push({
                    name:'People'
                })
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
