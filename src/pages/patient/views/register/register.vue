<template>
  <div class="h5-container">
    <div class="section-title-form">
      <h5-title @clickLeft="onGoToLogin">注册</h5-title>
      <h5-input
        label="用户名"
        v-model="name"
        placeholder="请输入用户名"
      ></h5-input>
      <h5-input
        label="身份证号码"
        v-model="idcard"
        placeholder="请输入身份证号码"
      ></h5-input>
      <h5-input
        label="密码"
        type="password"
        v-model="password"
        placeholder="请输入密码"
      ></h5-input>
      <h5-input
        label="手机号码"
        v-model="mobile"
        placeholder="请输入手机号码"
      ></h5-input>
    </div>

    <div class="section-actions">
      <h5-button @click="onRegister">确定</h5-button>
    </div>
  </div>
</template>

<script>
import H5Title from "../../../../components/title/h5-title";
import H5Input from "../../../../components/input/h5-input";
import H5Button from "../../../../components/button/h5-button";
import { MessageBox } from "mint-ui";
import { put } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import md5 from "js-md5";
import test from "../../../test";

export default {
  name: "register",
  components: {
    H5Title,
    H5Input,
    H5Button
  },
  data() {
    return {
      certificate: "",
      department: "",
      grade: "",
      idcard: test.patient.idcard ? test.patient.idcard : "",
      location: "",
      mobile: test.patient.mobile ? test.patient.mobile : "",
      name: test.patient.name ? test.patient.name : "",
      password: test.patient.password ? test.patient.password : "",
      registerErrorMessage: ""
    };
  },
  methods: {
    onGoToLogin() {
      this.$router.push({ path: "/login" });
    },
    onRegister() {
      // 测试数据
      this.registerErrorMessage = "";
      const config = {
        url: `api/v1/user`,
        data: {
          certificate: this.certificate,
          department: this.department,
          grade: this.grade,
          idcard: this.idcard,
          location: this.location,
          mobile: this.mobile,
          name: this.name,
          password: md5(this.password.trim()).toUpperCase(),
          roles: "1"
        }
      };
      put(config)
        .then(res => {
          debug.log(res);
          // const _this = this;
          // this.$success({
          //   title: res.message,
          //   onOk() {
          //     _this.onGoToLogin();
          //   }
          // });
          MessageBox.alert(res.message).then(() => {
            this.onGoToLogin();
          });
        })
        .catch(err => {
          debug.error("注册失败", err);
          this.registerErrorMessage = err;
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "register";
</style>
