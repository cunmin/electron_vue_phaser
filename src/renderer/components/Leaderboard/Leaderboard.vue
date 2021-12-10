<template>
  <transition name="fade">
    <div class="leaderboard align-center">
      <h1>Leaderboard</h1>
      <div id="showtree">
        <ul class="nav-list">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/leaderboard/goods">全部商品</router-link>
          </li>
        </ul>
      </div>
      <span v-bind:title="message">
        鼠标悬停几秒钟查看此处动态绑定的提示信息！
      </span>
      <div @click="clickevent">编程式导航</div>
      <router-view></router-view>

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
import * as THREE from 'three';
export default {
  name: 'leaderboard',
  data() {
    return {
      // scorelist:[1,2,3,4],
      message: '页面加载于 ' + new Date().toLocaleString()
    }
  },

  computed: {
    scores() {
      return this.$store.getters.allScores;
      // return this.scorelist;
    }
  },
  mounted() {
    var that = this;
    // let contaniner = document.createElement("div");
    // contaniner.className = "playerContainer";
    // contaniner.style.backgroundColor = "rgba(255,0,0)";
    // document.getElementById('showtree').appendChild(contaniner)
    that.createtree();
  },


  methods: {
    createtree() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
      // document.body.appendChild( renderer.domElement );
      document.getElementById('showtree').appendChild(renderer.domElement);

      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 5;

      const animate = function () {
        requestAnimationFrame(animate);

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    },
    formattedDate(dateString) {
      return new Date(dateString).toLocaleString();
    },
    changecount() {
      // this.$store.commit('increment');
      // console.log(this.$store.state.count);
      console.log(this.$store.state.scores)
    },
    clickevent() {
      this.$router.push({ path: '/leaderboard/goods' })
    }
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

  .nav-list {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 22px;
    a {
      color: #c8c8c8;
      display: block;
      font-size: 14px;
      padding: 0 25px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
