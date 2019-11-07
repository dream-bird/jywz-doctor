<template>
  <div class="menus">
    <div class="back" @click="onClickGoBack">
      <img src="../../assets/images/machine_back.png" />
      <div>返回</div>
    </div>
    <div class="title"><slot></slot></div>
    <div class="home" @click="onClickGoHome">
      <img src="../../assets/images/machine_home.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "machine-navbar",
  methods: {
    onClickGoBack() {
      this.$router.go(-1);
    },
    onClickGoHome() {
      this.$router.push({
        path: `/`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.menus {
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(
    270deg,
    rgba(38, 135, 238, 1) 0%,
    rgba(70, 176, 248, 1) 54%,
    rgba(85, 200, 254, 1) 100%
  );

  .back {
    display: flex;
    align-items: center;
    padding: 0 34px;
    font-size: 27px;
    font-weight: 400;
    color: #ffffff;

    img {
      display: block;
      width: 14px;
      height: 24px;
      margin-right: 9px;
    }
  }

  .home {
    padding: 0 34px;

    img {
      width: 34px;
      height: 34px;
    }
  }

  .title {
    font-size: 31px;
    font-weight: 600;
    color: #ffffff;
    line-height: 43px;
  }
}
</style>
