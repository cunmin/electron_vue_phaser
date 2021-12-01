<template>
  <transition name="fade">
    <div class="leaderboard align-center">
      <h1>Leaderboard</h1>

      <table v-if="scores.length > 0">
        <thead>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th style="padding-left: 1px;">Score</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(scoreObj, index) in scores"
            :key="index"
          >
            <td>{{index + 1}}</td>
            <td>{{formattedDate(scoreObj.date)}}</td>
            <td>{{scoreObj.score}}</td>
          </tr>
        </tbody>
      </table>

      <h2 v-else>No scores.<br>Let's play a few times!</h2>
      <div @click="changecount">test vuex</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'leaderboard',
  data() {
    return {
      // scorelist:[1,2,3,4],
    }
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
.leaderboard {
  overflow: auto;
  max-height: 550px;
  padding-left: 20px;

  tbody {
    td:last-child {
      @include gradient-text($gradient-secondary);
      font-weight: 700;
    }
  }
}
</style>
