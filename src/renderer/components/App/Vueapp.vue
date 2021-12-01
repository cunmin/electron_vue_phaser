<template>
  <div>
    <h1 style="padding-left: 50px;">Germs</h1>

    <div :id="containerId">

    </div>
  </div>

</template>

<script>
// import GiftListLeft from "../giftListLeft.vue"
// import game from './Testgame.js';
export default {
  name: 'vueapp',
  data() {
    return {
      // scorelist:[1,2,3,4],
      containerId: 'canvascontainer',
      gameInstance: null,

    }
  },
  async mounted() {
    const game = await import(/* webpackChunkName: "game" */ './Phasergame')
    this.$nextTick(() => {
      this.gameInstance = game.launch(this.containerId)
    })
  },
  destroyed() {
    this.gameInstance.destroy(false)
    // var obj = document.getElementById(this.containerId)
    // console.log("===",obj)
    // // obj.removeChild(obj.childNodes[0]);
    // obj.innerHTML = ""
    // this.gameInstance = null
    // console.log("destroyed=======================");
  },
  components: {
    // GiftListLeft,
  },

  computed: {
    scores() {
      return this.$store.getters.allScores;
      // return this.scorelist;
    }
  },

  methods: {
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    changecount() {
      // this.$store.commit('increment');
      // console.log(this.$store.state.count);
      console.log(this.$store.state.scores)
    },
  }
};
</script>

<style scoped lang="scss">
#table {
  display: table;
  width: 100%;
  height: 100%;
  background: gray;
}
#cell {
  display: table-cell;
  vertical-align: middle;
}
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
#ad-container {
  width: 320px;
  height: 50px;
  position: absolute;
  bottom: 0px;
  left: 50%;
  margin-left: -160px;
}
</style>
