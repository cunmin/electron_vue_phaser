<template>
  <div id="app">
    <topbar></topbar>
    <router-view></router-view>
    <y-footer></y-footer>
  </div>
</template>

<script>
import Topbar from './components/Topbar.vue';
import YFooter from './common/footer.vue';
// import store from './store/store.js';
export default {
  // store:store,
  components: { Topbar, YFooter },
  name: 'myelectron_vue',
  
}
</script>

<style lang="scss">
/* CSS */
@import './styles/milligram';
</style>
