<template>
  <div class="row">
    <div class="column game">
      <div
        class="greeting align-center"
        v-if="!gameStarted"
      >
        <div class="banner">
          <div
            class="bg"
            ref="bg"
            @mouseover="bgOver($refs.bg)"
            @mousemove="bgMove($refs.bg,$event)"
            @mouseout="bgOut($refs.bg)"
          >
            <span class="img a"></span>
            <span class="text b">Welcome to Snake Game<br />Push the button on the left to start!</span>
            <span class="copyright c">以傲慢与偏执 | 回敬傲慢与偏见</span>
          </div>
        </div>
        <div class="good-item">
          
            <div class="good-img">
              <img
                v-lazy="`http://images.yome11.cn/avatar/1638169429471.png`"
                :alt="`详情`"
              >
            </div>
          
        </div>
        <!-- <h1>Welcome to Snake Game</h1>
        <p>Push the button on the left to start!</p> -->
      </div>

      <div id="stage"></div>

      <transition name="fade">
        <div
          class="finished-game-popup shadow align-center"
          v-if="gamePaused"
        >
          <h4>Game Paused</h4>
        </div>
        <div
          class="finished-game-popup shadow align-center"
          v-if="lastGame.finished"
        >
          <h4>Game Over</h4>
          <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
        </div>
        <div
          class="finished-game-popup shadow align-center"
          v-if="gameWon"
        >
          <h4>You won!</h4>
          <p>Congratulations!</p>
          <p>Your score is<br><span>{{lastGame.lastScore}}</span></p>
        </div>
      </transition>
    </div>

    <div class="column column-25 sidebar-wrapper">
      <div class="sidebar align-center align-items-center">
        <h2>Score: <span id="score"></span></h2>

        <button v-on:click="startGame">Start</button><br>
        <transition name="scale">
          <div v-if="gameStarted && !lastGame.finished">
            <button
              v-on:click="pauseGame"
              v-if="isPlaying"
            >Pause</button>
            <button
              v-on:click="resumeGame"
              v-if="!isPlaying"
            >Resume</button>
          </div>
        </transition>

        <h2>Settings</h2>
        <label for="difficulty">Difficulty {{difficulty}}</label>
        <input
          id="difficulty"
          type="range"
          min="5"
          max="50"
          v-model="difficulty"
        >

        <h2>Controls</h2>
        <p class="instruction">Use arrow buttons or your keyboard to control the snake</p>
        <div class="controls">
          <div class="row">
            <div class="column align-center">
              <img
                src="./assets/Up.png"
                :class="{ pressed: isUpButtonPressed }"
                v-on:click="buttonPressed(38)"
              >
            </div>
          </div>
          <div class="row">
            <div class="column align-center">
              <img
                src="./assets/Left.png"
                :class="{ pressed: isLeftButtonPressed }"
                v-on:click="buttonPressed(37)"
              >
              <img
                src="./assets/Down.png"
                :class="{ pressed: isDownButtonPressed }"
                v-on:click="buttonPressed(40)"
              >
              <img
                src="./assets/Right.png"
                :class="{ pressed: isRightButtonPressed }"
                v-on:click="buttonPressed(39)"
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from './Game.js';

export default {
  name: 'game',

  data() {
    return {
      game: null,
      difficulty: 10,
      isPlaying: false,
      gameStarted: false,
      gamePaused: false,
      isLeftButtonPressed: false,
      isUpButtonPressed: false,
      isRightButtonPressed: false,
      isDownButtonPressed: false,
      bgOpt: {
        offsetLeft: 0,
        offsetTop: 0,
        offsetWidth: 0,
        offsetHeight: 0
      },
    };
  },

  computed: {
    lastGame() {
      return {
        finished: this.$store.getters.finishedGame.finished,
        lastScore: this.$store.getters.finishedGame.score
        // finished: false,
        // lastScore: 10
      };
    },

    gameWon() {
      return this.$store.getters.gameWon;
      // return false;
    }
  },

  methods: {
    // 鼠标移入
    bgOver(event) {
      // 获取移入时的位置
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = event
      this.bgOpt.offsetLeft = offsetLeft
      this.bgOpt.offsetTop = offsetTop
      this.bgOpt.offsetWidth = offsetWidth
      this.bgOpt.offsetHeight = offsetHeight
    },
    // 鼠标移动
    bgMove(dom, eve) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.bgOpt
      let X, Y
      let mouseX = eve.pageX - offsetLeft
      let mouseY = eve.pageY - offsetTop
      if (mouseX > offsetWidth / 2) {
        X = mouseX - (offsetWidth / 2)
      } else {
        X = mouseX - (offsetWidth / 2)
      }
      if (mouseY > offsetHeight / 2) {
        Y = offsetHeight / 2 - mouseY
      } else {
        Y = offsetHeight / 2 - mouseY
      }
      dom.style['-webkit-transform'] = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
      dom.style.transform = `rotateY(${X / 50}deg) rotateX(${Y / 50}deg)`
    },
    // 鼠标移除
    bgOut(dom) {
      dom.style.transform = 'rotateY(0deg) rotateX(0deg)'
      dom.style['-webkit-transform'] = 'rotateY(0deg) rotateX(0deg)'
    },
    startGame() {
      this.removePreviousCells();

      this.game = new Game(24, 24, 24, this.difficulty);

      this.gameStarted = true;
      this.isPlaying = true;
      this.gamePaused = false;

      this.$store.dispatch('TOGGLE_GAME', { finished: false, score: 0 });
      this.$store.dispatch('WIN_GAME', false);
    },

    pauseGame() {
      this.isPlaying = this.game.finishLoop();
      this.gamePaused = true;
    },

    resumeGame() {
      this.isPlaying = this.game.startLoop();
      this.gamePaused = false;
    },

    buttonPressed(key) {
      // Control snake if game started
      if (this.gameStarted) {
        this.game.snake.controller(key);
      }

      let button = '';

      if (key === 37) {
        button = 'Left';
      }
      if (key === 38) {
        button = 'Up';
      }
      if (key === 39) {
        button = 'Right';
      }
      if (key === 40) {
        button = 'Down';
      }

      // Button animation
      this[`is${button}ButtonPressed`] = true;
      setTimeout(() => {
        this[`is${button}ButtonPressed`] = false;
      }, 200);
    },

    removePreviousCells() {
      if (this.game !== null) {
        const stage = this.game.stage;

        while (stage.hasChildNodes()) {
          stage.removeChild(stage.lastChild);
        }
      }
    }
  },

  created() {
    window.addEventListener('keydown', (e) => {
      this.buttonPressed(e.keyCode);
    });
  }
};
</script>

<style lang="scss">
@import "../../styles/mixins.scss";
.game {
  position: relative;

  .greeting {
    margin-top: 10px;
    .banner,
    .banner span,
    .banner div {
      font-family: 'Microsoft YaHei';
      transition: all 0.3s;
      -webkit-transition: all 0.3s;
      transition-timing-function: linear;
      -webkit-transition-timing-function: linear;
    }

    .banner {
      perspective: 3000px;
      position: relative;
      z-index: 19;
    }
    .bg {
      position: relative;
      width: 700px;
      height: 200px;
      margin: 20px auto;
      background: url('/static/images/win.jpg') center no-repeat;
      background-size: 100% 100%;
      border-radius: 10px;
      transform-style: preserve-3d;
      -webkit-transform-origin: 50% 50%;
      -webkit-transform: rotateY(0deg) rotateX(0deg);
    }

    .img {
      display: block;
      position: absolute;
      width: 80px;
      height: 80px;
      bottom: 5px;
      left: 0;
      background: url('/static/images/universal.png') center no-repeat;
      background-size: 95% 100%;
    }
    .text {
      position: absolute;
      top: 20%;
      right: 10%;
      font-size: 30px;
      color: #fff;
      text-align: right;
      font-weight: lighter;
    }

    .copyright {
      position: absolute;
      bottom: 10%;
      right: 10%;
      font-size: 10px;
      color: #fff;
      text-align: right;
      font-weight: lighter;
    }

    .a {
      -webkit-transform: translateZ(40px);
    }

    .b {
      -webkit-transform: translateZ(20px);
    }

    .c {
      -webkit-transform: translateZ(0px);
    }

    .good-item {
      background: #fff;
      width: 25%;
      transition: all 0.5s;
      height: 300px;
      margin-left: 10px;
      &:hover {
        transform: translateY(-3px);
        box-shadow: 1px 1px 20px #999;
      }

      .good-img {
        img {
          margin: 50px auto 10px;
          @include wh(156px);
          display: block;
        }
      }
    }
  }

  #stage {
    position: relative;
    margin: 0 auto;

    .cell {
      position: absolute;
      transition: all 0.1s;
      background-color: #fff;

      &.filled {
        @include cell-image('./assets/Clone.png');
        transform: scale($scale-coef);

        &.food {
          @include cell-image('./assets/Planet-2.png');
          transform: scale(1);
        }

        &.head {
          @include cell-image('./assets/Darth-Vader.png');
          transform: scale(1);
        }
      }

      &.empty {
      }
    }

    .back-cell {
      @extend .cell;
    }
  }
}

.column.sidebar-wrapper {
  padding-left: 20px;

  .sidebar {
    height: 100%;

    h2 {
      margin: 40px 0 10px;

      &:first-child {
        margin-top: 0;
      }
    }

    input[type='range'] {
      margin-bottom: 0;
    }

    .instruction {
      margin-bottom: 10px;
    }

    .controls {
      img {
        display: inline-block;
        width: 38px;
        padding: 7px;
        background: $gradient-primary;
        border-radius: $radius-primary;
        transition: $transition-primary;
        cursor: pointer;

        &.pressed {
          transform: scale($scale-coef);
          background: $gradient-secondary;
        }
      }
    }
  }
}

.finished-game-popup {
  position: absolute;
  margin: 0 auto;
  top: 230px;
  left: 298px;
  transform: translateX(-50%);
  z-index: 2;
  padding: 20px;
  background-color: #fff;

  h4,
  p {
    margin-bottom: 0;
  }

  span {
    @include gradient-text($gradient-secondary);
    font-weight: 700;
    font-size: 20px;
  }
}

button:active {
  transform: scale($scale-coef);
  background: $gradient-secondary;
}
</style>
