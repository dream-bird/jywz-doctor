<template>
  <div class="menus">
    <div class="left">
      <img src="../../assets/images/logo.png" />
      <div>就诊问诊系统</div>
    </div>
    <div class="right">
      <div class="user">{{ department }} {{ name }}</div>
      <img src="../../assets/images/machine_avatar.png" />
      <div class="divider"></div>
      <div class="logout" @click="onClickLogout">退出登录</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "doctor-navbar",
  props: ["department", "name"],
  methods: {
    onClickLogout() {
      this.$emit("logout");
    },
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
  height: 64px;
  background: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 63px;

  .left {
    display: flex;
    align-items: center;
    font-size: 22px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 26px;

    img {
      height: 45px;
      margin-right: 20px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .user {
      font-size: 17px;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
      line-height: 23px;
    }

    img {
      width: 40px;
      height: 40px;
      margin: 0 20px;
    }

    .divider {
      width: 1px;
      height: 36px;
      background: rgba(221, 221, 221, 1);
    }

    .logout {
      font-size: 14px;
      font-weight: 600;
      color: rgba(0, 144, 255, 1);
      margin: 0 20px;
    }
  }
}
</style>
