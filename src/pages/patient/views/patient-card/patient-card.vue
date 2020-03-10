<template>
  <div id="patient-card">
    <h5-title @clickLeft="$router.go(-1)">就诊卡</h5-title>
    <div class="section-card">
      <div class="card" @click="onClickCard">
        <div class="title">河北东软电子就诊卡</div>
        <div class="sub-title">{{ patientCard }}</div>
      </div>
      <div class="tips">使用说明：就诊前请点击卡面上的二维码并出示给医生</div>
    </div>
  </div>
</template>

<script>
import { getWithAuth, postWithAuth } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import H5Title from "../../../../components/title/h5-title";
import { MessageBox, Indicator } from "mint-ui";

export default {
  name: "patient-card",
  components: {
    H5Title
  },
  data() {
    return {
      patientCard: "",
      patientCardState: "",
      patientCardQRCode: "",
      patientCardQRCodeState: ""
    };
  },
  created() {
    this.getPatientCard();
  },
  methods: {
    onClickCard() {
      debug.log(this.patientCard, this.patientCardState);
      if (this.patientCard && this.patientCardState === "可用") {
        this.$router.push({ path: "/patient-card-qrcode" });
      } else {
        this.onRegisterPatientCard();
      }
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
          if (err === "该用户还未申领电子医疗卡") {
            this.onRegisterPatientCard();
          }
        });
    },
    onRegisterPatientCard() {
      Indicator.open({
        text: "申领就诊卡...",
        spinnerType: "fading-circle"
      });
      const config = {
        url: `api/v1/ecard`
      };
      postWithAuth(config)
        .then(res => {
          debug.log("患者申领就诊卡成功", res);
          this.getPatientCard();
          Indicator.close();
        })
        .catch(err => {
          debug.error("患者申领就诊卡失败", err);
          Indicator.close();
          MessageBox.alert(err).then(() => {});
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
          debug.log("");
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "patient-card";
</style>
