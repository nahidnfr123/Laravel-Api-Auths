<template>
    <div>
        <b-list-group v-if="users && users.length">
            <div style="padding: 10px 0; text-align: center;background-color: bisque">User List</div>
            <hr>
            <b-list-group-item v-for="user in users" :key="user.id">
                <div>
                    <strong class="font-monospace">Name: </strong>{{ user.name }}
                </div>
                <div>
                    <strong class="font-monospace">Username: </strong> {{ user.username }}
                </div>
                <div>
                    <strong class="font-monospace">Email: </strong>
                    {{ user.email }},
                    <span v-if="user.email_verified_at" style="color: green; margin-left: 20px">Verified</span>
                </div>
            </b-list-group-item>
        </b-list-group>
        <div v-else>
            <div style="text-align: center; padding-top: 20px; color: blueviolet; font-weight: bolder;">
                No Users found ...
            </div>
        </div>
    </div>
</template>

<script>
import {HTTP} from "@/plugins/http";

export default {
    name: "people.vue",
    data() {
        return {
            users: []
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            await HTTP.get('/api/users')
                .then((response) => {
                    this.users = response.data;
                })
                .catch(error => {
                    //generateErrors({commit, dispatch}, error, err, "Error Logging out!", false);
                });
        }
    }
}
</script>

<style scoped>

</style>
