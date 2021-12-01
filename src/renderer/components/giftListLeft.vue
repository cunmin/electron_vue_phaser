<template>
  <div
    ref="main"
    class="main"
    :id="left ? 'left' : 'right'"
  >
    <div class="mask-filter">

    </div>
    <div class="bg-black">
      
    </div>
    
  </div>
</template>

<script>
export default {
  name: "giftListLeft",
  props: {
    gift: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      left: false,
      isBig: false,
      first: false,
    };
  },
  created() { },
  mounted() {
    this.getLeft();
  },
  watch: {
    gift: {
      handler(newValue, oldValue) {
        if (oldValue) {
          this.isBig = true;
          setTimeout(() => {
            this.isBig = false;
          }, 300);
          console.log(oldValue, newValue, "1212212");
        }
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    getLeft() {
      this.left = true;
    },
    getRight() {
      console.log("即将销毁");
      this.left = false;
    },
  },
  beforeDestroy() {
    this.getRight();
  },
};
</script>

<style lang="scss" scoped>
@font-face {
  font-family: 'Unnamed';
  src: url('../assets/font/Unnamed.ttf');
  font-weight: normal;
  font-style: normal;
}
#isBigNum {
  -webkit-animation: small 0.3s linear;
  animation: small 0.3s linear;
}
@keyframes small {
  0% {
    transform: scale(1);
  }
  66% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
#left {
  position: absolute;

  -webkit-animation: left 0.9s ease;
  animation: left 0.9s ease;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
@keyframes left {
  from {
    left: -203px;
    opacity: 0.8;
  }
  to {
    left: 0;
    opacity: 1;
  }
}
#right {
  position: absolute;
  -webkit-animation: right 0.2s ease;
  animation: right 0.2s ease;
  -webkit-animation-fill-mode: forwards;
  animation-fill-mode: forwards;
}
@keyframes right {
  from {
    left: 0;
    opacity: 1;
  }
  to {
    left: -203px;
    opacity: 0.5;
  }
}
.main {
  height: 60px;
  display: flex;
  align-items: center;
  //   background-color: red;
  width: 300px;
  position: relative;
  .mask-filter {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba($color: #fff, $alpha: 0.7);
    backdrop-filter: blur(10px);
    z-index: -1;
    display: none;
  }

  .bg-black {
    display: flex;
    align-items: center;
    width: 203px;
    height: 48px;
    padding: 7px 0 7px 7px;
    border-radius: 24px;
    background: rgba(0, 0, 0, 0.5);
    .avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .text {
      margin-left: 8px;
      p {
        margin: 0;
        justify-content: center;
        width: 84px;
        text-align: start;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-box-orient: vertical;
        word-break: break-all;
      }
      .giftFrom {
        line-height: 20px;
        font-size: 14px;
        color: white;
      }
      .giftTo {
        color: rgba(255, 191, 40, 1);
        font-size: 12px;
        line-height: 14px;
        span {
          font-size: 12px;
          color: #fff;
        }
      }
    }
    .giftimg {
      width: 51px;
      height: 60px;
      margin-left: 9px;
    }
  }
  .giftNum {
    margin-left: 4px;
    font-size: 30px;
    color: #ffffff;
    line-height: 51px;
    font-family: 'Unnamed';
  }
}
</style>