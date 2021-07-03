<template>
    <div class="m-10">
        <div v-if="usersList && Object.keys(usersList).length">
            <h1 class="text-2xl font-bold">
                User List:
            </h1>
            <ul>
                <li v-for="user in usersList" :key="user.id" class="border list-none rounded-sm px-3 py-3" style='border-bottom-width:0'>
                    <span class="font-bold">Name: </span>{{ user.name }},
                    <span class="font-bold">Username: </span>{{ user.username }},
                    <span class="font-bold">Email: </span> {{ user.email }}
                </li>
            </ul>
        </div>
        <div v-else>
            <div style="text-align: center; padding-top: 20px; color: blueviolet; font-weight: bolder;">
                No Users found ...
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: ['auth'],
    data() {
        return {
            usersList: {}
        }
    },
    mounted() {
        this.getUsers();
    },
    methods: {
        async getUsers() {
            this.$axios.$get('/api/users').then((res) => {
                this.usersList = res;
            }).catch((err) => {
                if (err) {
                    alert('Error');
                    console.log(err);
                }
            });
        },

    }
}
</script>
