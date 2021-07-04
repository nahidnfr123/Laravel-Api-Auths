<template>
  <div id="app">
    <navigation></navigation>

    <router-view/>
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
import store from "./store";
export default {
  components: {Navigation},
    mounted() {
      if(localStorage.getItem('token')){
          store.dispatch('auth/me');
      }
    }
}
</script>

<style lang="scss">

</style>
