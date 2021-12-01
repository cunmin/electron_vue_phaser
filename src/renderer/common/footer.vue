<template>
  <div class="footer"  @mouseover="cartShowState(true)" @mouseout="cartShowState(false)" >
    <div class="tag">
      <a href="javascript:;">简体</a>
      <a href="javascript:;">繁体</a>
      <a href="javascript:;">English</a>
      <a href="javascript:;">常见问题</a>
    </div>
    <div class="cop" v-show="!isshow">
      <p>Copyright © 2011-2021 xx.com 版权所有</p>
    </div>

  </div>
</template>
<script>
export default {
  name: 'yfooter',
  data() {
    return {
      isshow: false,

    }
  },
  methods: {
   cartShowState (state) {
        this.isshow = state;
      },
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.footer {
  padding: 50px 0 20px;
  background: #fff;
  margin-top: 20px;
}

.tag {
  display: flex;
  justify-content: center;
  a {
    height: 14px;
    padding: 0 10px;
    line-height: 14px;
  }
  a + a {
    border-left: 1px solid #666;
  }
}

.cop {
  text-align: center;
  margin: 10px 0;
}
</style>
