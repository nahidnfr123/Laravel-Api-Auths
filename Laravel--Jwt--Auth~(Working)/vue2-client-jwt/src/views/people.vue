<template>
    <div>
        <v-card
            class="mx-auto"
            max-width="400"
            tile
            v-if="users && users.length"
        >
            <div style="padding: 10px 0; text-align: center;background-color: bisque">User List</div>
            <hr>
            <v-list-item v-for="user in users" :key="user.id">
                <v-list-item-content>
                    <v-list-item-title>{{ user.name }}</v-list-item-title>
                    <v-list-item-subtitle>
                        {{ user.username }}
                    </v-list-item-subtitle>
                    <v-list-item-subtitle>
                        {{ user.email }}, <span v-if="user.email_verified_at" style="color: green; margin-left: 20px">Verified</span>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-card>
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
