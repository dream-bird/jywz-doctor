<template>
  <div id="h5-button">
    <div :class="['button', circle ? 'circle' : '']" @click="onClick">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "h5-button",
  props: {
    circle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onClick() {
      this.$emit("click");
    }
  }
};
</script>

<style lang="less" scoped>
#h5-button {
  width: 750px;

  .button {
    height: 94px;
    margin: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    background: rgba(0, 144, 255, 1);
    border-radius: 4px;
  }

  .circle {
    border-radius: 48px;
  }
}
</style>
