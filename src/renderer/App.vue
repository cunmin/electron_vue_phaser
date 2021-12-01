<template>
  <div id="app">
    <topbar></topbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue';
// import store from './store/store.js';
export default {
  // store:store,
  components: { Topbar },
  name: 'myelectron_vue',
  component: {
    Topbar
  },
}
</script>

<style lang="scss">
/* CSS */
@import './styles/milligram';
</style>
