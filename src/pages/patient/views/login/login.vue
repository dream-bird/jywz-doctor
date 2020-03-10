<template>
  <div class="h5-container">
    <div class="section-title">
      <div class="logo">
        <img src="../../../../assets/images/logo.png" />
      </div>
      <div class="title">欢迎使用就诊问诊</div>
    </div>

    <div class="section-form">
      <div class="username">
        <input type="text" v-model="username" placeholder="身份证号码" />
      </div>
      <div class="password">
        <input
          :type="passwordVisible ? 'text' : 'password'"
          v-model="password"
          placeholder="密码"
        />
        <svg
          class="iconfont icon-h5-eye"
          aria-hidden="true"
          @click="passwordVisible = !passwordVisible"
        >
          <use xlink:href="#icon-h5-eye-open" v-if="passwordVisible"></use>
          <use xlink:href="#icon-h5-eye-close" v-else></use>
        </svg>
      </div>
    </div>

    <div class="section-actions">
      <h5-button @click="onLogin" circle>登录</h5-button>
    </div>

    <div class="section-tips">
      还没有账号，点击 <span @click="onGoToRegister">注册</span>
    </div>
  </div>
</template>

<script>
import H5Button from "../../../../components/button/h5-button";
import { post } from "../../../../utils/util.http";
import session from "../../../../utils/util.session";
import debug from "../../../../utils/util.debug";
import md5 from "js-md5";
import test from "../../../test";

export default {
  name: "login",
  components: {
    H5Button
  },
  data() {
    return {
      username: test.patient.idcard ? test.patient.idcard : "",
      password: test.patient.password ? test.patient.password : "",
      passwordVisible: false
    };
  },
  methods: {
    onGoToRegister() {
      this.$router.push({ path: "/register" });
    },
    onLogin() {
      const config = {
        url: "oauth/token",
        params: {
          grant_type: "password",
          client_id: "practice",
          client_secret: "neuqsoft2019",
          username: this.username,
          password: md5(this.password.trim()).toUpperCase()
        }
      };
      post(config)
        .then(res => {
          debug.log("登录成功", res);
          session.update(res);
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          debug.error("登录失败", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "login";
</style>
