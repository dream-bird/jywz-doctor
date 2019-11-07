<template>
  <div class="page-container">
    <div class="main">
      <div class="main-left flex-center">
        <img
          class="image"
          src="../../../../assets/images/doctor_login_main_image.png"
          alt="main_image"
        />
      </div>
      <div class="main-right flex-center">
        <div class="form">
          <h1 class="title">欢迎登录就诊问诊</h1>
          <div class="form-item flex-col">
            <label for="username">用户名</label>
            <input
              id="username"
              type="text"
              placeholder="请输入用户名"
              v-model="username"
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
          <div class="form-item">
            <button @click="onLogin">登 录</button>
          </div>
          <div class="form-item text-right">
            <span>没有账号 </span><a @click="onGoToRegister">请注册</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "../../../../utils/util.http";
import session from "../../../../utils/util.session";
import debug from "../../../../utils/util.debug";
import md5 from "js-md5";
import test from "../../../test";

export default {
  name: "login",
  components: {},
  data() {
    return {
      username: test.patient.idcard ? test.patient.idcard : "",
      password: test.patient.password ? test.patient.password : ""
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
  display: flex;
  flex-direction: row;
  margin: 80px auto;
  background: #ffffff;
  box-shadow: 0 3px 18px 0 rgba(21, 24, 113, 1);
  border-radius: 18px;

  .main-left {
    width: 40%;
    background: linear-gradient(
      147deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(199, 226, 254, 1) 100%,
      rgba(200, 227, 254, 1) 100%
    );
    border-radius: 18px 0 0 18px;

    .image {
      width: auto;
      max-width: 80%;
    }
  }

  .main-right {
    width: 60%;

    .form {
      width: 100%;
      height: 100%;
      padding: 81px 77px;

      .title {
        color: #333333;
        font-size: 28px;
        font-weight: 600;
      }

      .form-item {
        margin-top: 75px;

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
}

@media (max-width: 992px) {
  .main {
    .main-left {
      display: none;
    }

    .main-right {
      width: 100%;
    }
  }
}
</style>
