<template>
  <div class="page-container">
    <div class="main">
      <div class="form">
        <h1 class="title">欢迎注册</h1>
        <div class="form-item flex-col">
          <label for="username">用户名</label>
          <input
            id="username"
            type="text"
            placeholder="请输入用户名"
            v-model="name"
          />
        </div>
        <div class="form-item flex-col">
          <label for="idcard">身份证号码</label>
          <input
            id="idcard"
            type="text"
            placeholder="请输入身份证号码"
            v-model="idcard"
          />
        </div>
        <div class="form-item flex-col">
          <label for="password">密码</label>
          <input
            id="password"
            type="password"
            placeholder="请输入密码"
            v-model="password"
          />
        </div>
        <div class="form-item flex-col">
          <label for="mobile">手机号码</label>
          <input
            id="mobile"
            type="text"
            placeholder="请输入手机号码"
            v-model="mobile"
          />
        </div>
        <div class="form-item flex-col">
          <label for="certificate">医生资格证号码</label>
          <input
            id="certificate"
            type="text"
            placeholder="请输入医生资格证号码"
            v-model="certificate"
          />
        </div>
        <div class="form-item flex-col">
          <label for="location">就诊地点</label>
          <input
            id="location"
            type="text"
            placeholder="请输入就诊地点"
            v-model="location"
          />
        </div>
        <div class="form-item flex-col">
          <label for="department">所在科室</label>
          <input
            id="department"
            type="text"
            placeholder="请输入所在科室"
            v-model="department"
          />
        </div>
        <div class="form-item flex-col">
          <label for="grade">职称</label>
          <input
            id="grade"
            type="text"
            placeholder="请输入职称"
            v-model="grade"
          />
        </div>
        <div class="form-item" v-show="registerErrorMessage">
          <a-alert :message="registerErrorMessage" banner />
        </div>
        <div class="form-item">
          <button @click="onRegister">注 册</button>
        </div>
        <div class="form-item text-right">
          <span>已有账号 </span><a @click="onGoToLogin">请登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { put } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import md5 from "js-md5";
import test from "../../../test";

export default {
  name: "register",
  components: {},
  data() {
    return {
      certificate: test.doctor.certificate ? test.doctor.certificate : "",
      department: test.doctor.department ? test.doctor.department : "",
      grade: test.doctor.grade ? test.doctor.grade : "",
      idcard: test.doctor.idcard ? test.doctor.idcard : "",
      location: test.doctor.location ? test.doctor.location : "",
      mobile: test.doctor.mobile ? test.doctor.mobile : "",
      name: test.doctor.name ? test.doctor.name : "",
      password: test.doctor.password ? test.doctor.password : "",
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
          roles: "2"
        }
      };
      put(config)
        .then(res => {
          debug.log(res);
          const _this = this;
          this.$success({
            title: res.message,
            onOk() {
              _this.onGoToLogin();
            }
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
.page-container {
  min-height: 100%;
  justify-content: center;
  background-image: url("../../../../assets/images/doctor_login_bg.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.main {
  width: 1000px;
  margin: 80px auto;
  background: #ffffff;
  box-shadow: 0 3px 18px 0 rgba(21, 24, 113, 1);
  border-radius: 18px;

  .form {
    width: 100%;
    height: 100%;
    padding: 50px 320px;

    .title {
      color: #333333;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 45px;
    }

    .form-item {
      margin-top: 21px;

      label {
        color: #333333;
        font-size: 20px;
        font-weight: 600;
        margin-bottom: 7px;
      }

      input {
        outline: none;
        border: none;
        border-bottom: 1px solid #d8d8d8;
        padding: 7px 0;
        color: #999999;
        font-size: 14px;
        font-weight: 400;
      }

      button {
        height: 60px;
        border: none;
        border-radius: 3px;
        background-color: #0090ff;
        box-shadow: 0 3px 18px 0 #0090ff;
        width: 100%;
        color: #ffffff;
        font-size: 20px;
        font-weight: 400;
      }

      span {
        color: #333333;
        font-size: 16px;
      }

      a {
        color: #0090ff;
        font-size: 16px;
      }
    }
  }
}
</style>
