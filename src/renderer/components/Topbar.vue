<template>
  <div
    id="topbar"
    class="shadow"
  >
    <div class="row">
      <div class="column">
        <div class="logo">
          <!-- <img src="~@/assets/icon.png"> -->
          <img v-lazy = "`http://images.yome11.cn/avatar/1638169429471.png`">
        </div>
      </div>

      <div class="column align-right" style="margin-top: 5px;">
        <router-link
          to="/"
          exact
        >Play</router-link>
        <router-link to="/leaderboard">Leaderboards</router-link>
        <router-link to="/vueapp">PhaserGames</router-link>
        <router-link to="/PetGameC">PetGame</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'topbar'
};
</script>

<style scoped lang="scss">
#topbar {
  background-color: #190606;
  padding: 40px;

  .logo {
    img {
      transition: all 0.3s;
      display: block;
      width: 35px;
      transform: scale(1.7);
      margin-left: 5px;
    }
  }

  a {
    display: inline-block;
    margin-left: 20px;
    color: #606c76;

    &:active,
    &.router-link-active {
        @include gradient-text($gradient-secondary);
    }
  }
}
</style>
