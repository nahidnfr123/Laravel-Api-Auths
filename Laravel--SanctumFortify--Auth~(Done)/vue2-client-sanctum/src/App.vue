<!--<template>-->
<!--    <v-app>-->
<!--        <div>-->
<!--            <navigation></navigation>-->
<!--            <v-main>-->
<!--                <v-container fluid>-->
<!--                    <router-view/>-->
<!--                </v-container>-->
<!--            </v-main>-->
<!--        </div>-->
<!--    </v-app>-->
<!--</template>-->

<template>
    <v-app id="inspire">

        <!-- Navigation Component -->
        <navigation></navigation>

        <v-main class="grey lighten-3">
            <v-container>
                <v-row>

                    <!-- Sidebar Component -->
                    <side-bar/>

                    <v-col>
                        <v-sheet
                            min-height="70vh"
                            rounded="lg"
                        >
                            <!-- Router Vue component -->
                            <router-view/>

                        </v-sheet>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>


<script>
import Navigation from "./components/Navigation";
import SideBar from "./components/SideBar";

export default {
    name: 'App',
    components: {SideBar, Navigation},
    data: () => ({
        //
    }),
};
</script>
