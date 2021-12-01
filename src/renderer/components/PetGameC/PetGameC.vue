<template>
  <div>
    <h1 style="padding-left: 50px;">Petgame</h1>

    <div :id="containerId">

    </div>
  </div>
  
</template>
<script src="./gameConfig.js"></script>
<script>
// import GiftListLeft from "../giftListLeft.vue"
// import game from './Testgame.js';
export default {
  name: 'PetGameC',
  data() {
    return {
      // scorelist:[1,2,3,4],
      containerId: 'canvascontainer',
      gameInstance: null,

    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ './gameConfig')
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
   
  },
  components: {
    // GiftListLeft,
  },

  computed: {
    
  },

  methods: {
   
  }
};
</script>

<style scoped lang="scss">

#canvascontainer {
  margin: auto;
  display: flex;
  justify-content: center;
  // outline: 1px solid white;
}
#canvascontainer canvas {
  width: 100%;
  height: 100%;
  display: block;
}

</style>
