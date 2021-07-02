<template>
    <div>
        <div class="my-4">
            <p>Your email is not verified! <span class="text-blue-500">Please verify your email address.</span></p>
        </div>

        <v-btn
            elevation="2"
            color="primary"
            @click="sendEmailVerificationLink">
            <span v-if="sendingEmail">Sending ...</span>
            <span v-else-if="emailSent">Email sent</span>
            <span v-else>Send Email Verification Link</span>
        </v-btn>
    </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
    name: "verify-email",
    data() {
        return {
            sendingEmail: false,
            emailSent: false,
            errors: []
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user',
        })
    },
    mounted() {
        if (this.user.email_verified_at != null) {
            this.$router.push({
                name: 'Home'
            })
        }
    },
    methods: {
        ...mapActions({
            verifyEmail: 'auth/emailVerification'
        }),
        async sendEmailVerificationLink() {
            this.sendingEmail = true;
            await this.verifyEmail().then(() => {
                this.emailSent = true;
            }).catch((error) => {
                this.errors = error;
            }).finally(() => {
                this.sendingEmail = false;
            })
        }
    }
}
</script>

