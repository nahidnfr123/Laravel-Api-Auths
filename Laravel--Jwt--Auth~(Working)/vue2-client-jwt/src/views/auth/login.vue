<template>
    <div>
        Login
    </div>
</template>

<script type="application/javascript">
import {mapGetters} from "vuex";

export default {
    data: () => ({
        username: '',
        password: '',
        errors: [],
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
                    name:'People'
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
