<template>
  <div class="page-container">
    <div class="main">
      <div class="title">河北东软就诊问诊挂号机</div>
      <div class="menus">
        <div class="menu" @click="onGoTo">
          <img src="../../../../assets/images/machine_home_menu_1.png" />
          <div class="name">预约挂号</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  methods: {
    onGoTo() {
      this.$router.push({ path: "/doctors" });
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100%;
  background: linear-gradient(
    180deg,
    rgba(38, 135, 238, 1) 0%,
    rgba(70, 176, 248, 1) 54%,
    rgba(85, 200, 254, 1) 100%
  );
}

.main {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 60px 100px;

  .title {
    display: flex;
    justify-content: center;
    font-size: 36px;
    font-weight: 600;
    color: #ffffff;
  }

  .menus {
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin-top: 110px;

    .menu {
      width: 277px;
      height: 388px;
      display: flex;
      flex-direction: column;
      align-items: center;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 2px 9px 0 rgba(26, 95, 133, 1);
      border-radius: 5px;

      img {
        width: 146px;
        height: 137px;
        margin-top: 88px;
        margin-bottom: 67px;
      }

      .name {
        font-size: 31px;
        font-weight: 600;
        color: #333333;
      }
    }
  }
}
</style>
