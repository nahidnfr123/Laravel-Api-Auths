<template>
    <v-app>
        <div>
            <navigation></navigation>
            <v-main>
                <v-container fluid>
                    <router-view/>
                </v-container>
            </v-main>
        </div>
    </v-app>
</template>

<script>
import Navigation from "@/components/Navigation";

export default {
    name: 'App',
    components: {Navigation},
    data: () => ({
        //
    }),
};
</script>
