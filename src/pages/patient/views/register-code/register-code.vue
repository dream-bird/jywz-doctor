<template>
  <div id="register-code">
    <h5-title @clickLeft="$router.go(-1)">模拟扫码</h5-title>
    <h5-input label="医生号码" v-model="doctorQRCode"></h5-input>
    <h5-button @click="onScanDoctorQRCode">确定</h5-button>
  </div>
</template>

<script>
import { getWithAuth } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import H5Title from "../../../../components/title/h5-title";
import H5Input from "../../../../components/input/h5-input";
import H5Button from "../../../../components/button/h5-button";
import { MessageBox } from "mint-ui";

export default {
  name: "register-code",
  components: {
    H5Input,
    H5Button,
    H5Title
  },
  data() {
    return {
      doctorQRCode: ""
    };
  },
  methods: {
    onScanDoctorQRCode() {
      if (!this.doctorQRCode) {
        return;
      }
      const config = {
        url: `api/v1/register/${this.doctorQRCode}`
      };
      getWithAuth(config)
        .then(res => {
          alert("恭喜你，挂号成功");
          debug.log("患者扫描医生挂号码成功", res);
          MessageBox("提示", "挂号成功");
        })
        .catch(err => {
          alert("挂号失败，请重新扫码！");
          debug.error("患者扫描医生挂号码失败", err);
          MessageBox("提示", "挂号失败，请重试");
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "register-code";
</style>
