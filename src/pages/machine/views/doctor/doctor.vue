<template>
  <div class="page-container">
    <machine-navbar>扫码挂号</machine-navbar>
    <div class="doctor">
      <div class="left">
        <div class="info-1">
          <span style="font-size:31px;">{{ doctor.name }}</span>
          {{ doctor.grade }}
        </div>
        <div class="info-2">
          <div class="label">号别：</div>
          <div class="value">{{ doctor.department }}</div>
        </div>
        <div class="info-2">
          <div class="label">就诊地点：</div>
          <div class="value">{{ doctor.location }}</div>
        </div>
        <div class="info-2">
          <div class="label">候诊人数：</div>
          <div class="value">{{ doctor.count }}</div>
        </div>
      </div>
      <div class="right">
        <div class="qr">
          <qrcode :value="doctorQRCode" :options="{ width: 287 }"></qrcode>
        </div>
        <div class="code">{{ doctorQRCode }}</div>
        <div class="tip">提示：请使用手机APP扫码医生二维码码挂号</div>
      </div>
    </div>
  </div>
</template>

<script>
import Qrcode from "@chenfengyuan/vue-qrcode";
import MachineNavbar from "../../../../components/navbar/machine-navbar";
import { get, post } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";

export default {
  name: "doctor",
  components: { MachineNavbar, Qrcode },
  data() {
    return {
      doctor: {},
      doctorQRCode: "暂无",
      interval: undefined
    };
  },
  created() {
    const uid = this.$route.params.uid;
    if (uid) {
      this.getDoctor(uid);
      this.getDoctorQRCode(uid);
      this.interval = setInterval(() => {
        this.getDoctor(uid);
      }, 5000);
    } else {
      this.$router.go(-1);
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    getDoctor(uid) {
      const config = {
        url: `api/v1/doctor/${uid}`
      };
      get(config)
        .then(res => {
          debug.log("获取医生信息成功", new Date().getTime(), res);
          this.doctor = res;
        })
        .catch(err => {
          debug.error("获取医生信息失败", err);
        });
    },
    getDoctorQRCode(uid) {
      const config = {
        url: `api/v1/register/${uid}`
      };
      post(config)
        .then(res => {
          debug.log("获取医生二维码成功", res);
          this.doctorQRCode = res.registerCode;
        })
        .catch(err => {
          debug.error("获取医生二维码失败", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  flex-direction: column;
  min-height: 100%;
  background: #f6f7fb;
}

.doctor {
  width: 974px;
  height: 507px;
  display: flex;
  flex-direction: row;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  margin: 88px auto;
  padding: 74px 142px 0;

  .left {
    width: 50%;
    color: #333333;

    .info-1 {
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;
      margin-bottom: 67px;
    }

    .info-2 {
      display: flex;
      margin: 35px 0;
      font-size: 24px;
      font-weight: 400;
      line-height: 34px;

      .label {
        width: 122px;
      }
    }
  }

  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .code {
      font-size: 24px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 34px;
    }

    .tip {
      font-size: 20px;
      font-weight: 400;
      color: rgba(0, 144, 255, 1);
      line-height: 28px;
    }
  }
}
</style>
