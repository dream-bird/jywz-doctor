<template>
  <div class="page-container">
    <div>
      <div>患者扫描医生挂号码</div>
      <div><input type="text" v-model="doctorQRCode" /></div>
      <button @click="onScanDoctorQRCode">扫描</button>
    </div>
    <hr />
    <div>
      <div>患者就诊卡信息</div>
      <div>患者就诊卡状态：{{ patientCardState }}</div>
      <div>患者就诊卡卡号：{{ patientCard }}</div>
      <button @click="getPatientCard">获取</button>
    </div>
    <hr />
    <div>
      <div>患者申领就诊卡</div>
      <button @click="onRegisterPatientCard">申领</button>
    </div>
    <hr />
    <div>
      <div>患者就诊卡二维码信息</div>
      <div>患者就诊卡二维码状态：{{ patientCardQRCodeState }}</div>
      <div>患者就诊卡二维码卡号：{{ patientCardQRCode }}</div>
      <button @click="getPatientCardQRCode">获取</button>
    </div>
    <hr />
    <div>
      <div>患者申领就诊卡二维码</div>
      <button @click="onRegisterPatientCardQRCode">申领</button>
    </div>
    <hr />
    <div>
      <div>授权医生使用患者就诊卡二维码信息</div>
      <button @click="onGrantDoctorUsePatientCardQRCode">授权</button>
    </div>
  </div>
</template>

<script>
import { getWithAuth, postWithAuth } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";

export default {
  name: "home",
  components: {},
  data() {
    return {
      doctorQRCode: "",
      patientCard: "",
      patientCardState: "",
      patientCardQRCode: "",
      patientCardQRCodeState: ""
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
          debug.log("患者扫描医生挂号码成功", res);
        })
        .catch(err => {
          debug.error("患者扫描医生挂号码失败", err);
        });
    },
    getPatientCard() {
      const config = {
        url: `api/v1/ecard`
      };
      getWithAuth(config)
        .then(res => {
          debug.log("患者获取就诊卡信息成功", res);
          this.patientCard = res.vid;
          this.patientCardState = res.state;
        })
        .catch(err => {
          debug.error("患者获取就诊卡信息失败", err);
          this.patientCardState = err;
        });
    },
    onRegisterPatientCard() {
      const config = {
        url: `api/v1/ecard`
      };
      postWithAuth(config)
        .then(res => {
          debug.log("患者申领就诊卡成功", res);
          alert(res.message);
          this.getPatientCard();
        })
        .catch(err => {
          debug.error("患者申领就诊卡失败", err);
        });
    },
    getPatientCardQRCode() {
      const config = {
        url: `api/v1/card`
      };
      getWithAuth(config)
        .then(res => {
          debug.log("患者获取就诊卡二维码信息成功", res);
          this.patientCardQRCode = res.code;
          this.patientCardQRCodeState = res.state;
        })
        .catch(err => {
          debug.error("患者获取就诊卡二维码信息失败", err);
        });
    },
    onRegisterPatientCardQRCode() {
      const config = {
        url: `api/v1/card`
      };
      postWithAuth(config)
        .then(res => {
          debug.log("患者申领就诊卡二维码成功", res);
          alert(res.message);
          this.getPatientCardQRCode();
        })
        .catch(err => {
          debug.error("患者申领就诊卡二维码失败", err);
        });
    },
    onGrantDoctorUsePatientCardQRCode() {
      const config = {
        url: `api/v1/card/${this.patientCardQRCode}`
      };
      postWithAuth(config)
        .then(res => {
          debug.log("授权医生使用患者就诊卡二维码信息成功", res);
          this.patientCardQRCode = res.code;
          this.patientCardQRCodeState = res.state;
        })
        .catch(err => {
          debug.error("授权医生使用患者就诊卡二维码信息失败", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100%;
  flex-direction: column;
}
</style>
