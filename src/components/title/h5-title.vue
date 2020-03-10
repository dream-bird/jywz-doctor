<template>
  <div id="h5-title" :style="{ background: background, color: color }">
    <div class="left" @click="onClickLeft">
      <svg class="iconfont icon-h5-back" aria-hidden="true">
        <use v-if="color === '#333333'" xlink:href="#icon-h5-back-1"></use>
        <use v-else xlink:href="#icon-h5-back-2"></use>
      </svg>
      <span class="text" :style="{ color: color }">返回</span>
    </div>
    <div class="center" :style="{ color: color }">
      <slot></slot>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
export default {
  name: "h5-title",
  props: {
    background: {
      type: String,
      default: "#ffffff"
    },
    color: {
      type: String,
      default: "#333333"
    }
  },
  methods: {
    onClickLeft() {
      this.$emit("clickLeft");
    }
  }
};
</script>

<style lang="less" scoped>
#h5-title {
  width: 750px;
  height: 94px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1px;
  background: rgba(255, 255, 255, 1);

  .left,
  .center,
  .right {
    width: 250px;
  }

  .left {
    display: flex;
    align-items: center;
    margin-left: 10px;
    height: 45px;

    .icon-h5-back {
      width: 40px;
    }

    .text {
      font-size: 32px;
      font-weight: 400;
      color: rgba(0, 144, 255, 1);
    }
  }

  .center {
    text-align: center;
    font-size: 36px;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 50px;
  }

  .right {
  }
}
</style>
