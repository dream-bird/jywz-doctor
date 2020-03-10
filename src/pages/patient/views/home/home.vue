<template>
  <div class="h5-container">
    <!--<div>-->
    <!--<div>患者扫描医生挂号码</div>-->
    <!--<div><input type="text" v-model="doctorQRCode" /></div>-->
    <!--<button @click="onScanDoctorQRCode">扫描</button>-->
    <!--</div>-->
    <!--<hr />-->
    <!--<div>-->
    <!--<div>患者就诊卡信息</div>-->
    <!--<div>患者就诊卡状态：{{ patientCardState }}</div>-->
    <!--<div>患者就诊卡卡号：{{ patientCard }}</div>-->
    <!--<button @click="getPatientCard">获取</button>-->
    <!--</div>-->
    <!--<hr />-->
    <!--<div>-->
    <!--<div>患者申领就诊卡</div>-->
    <!--<button @click="onRegisterPatientCard">申领</button>-->
    <!--</div>-->
    <!--<hr />-->
    <!--<div>-->
    <!--<div>患者就诊卡二维码信息</div>-->
    <!--<div>患者就诊卡二维码状态：{{ patientCardQRCodeState }}</div>-->
    <!--<div>患者就诊卡二维码卡号：{{ patientCardQRCode }}</div>-->
    <!--<button @click="getPatientCardQRCode">获取</button>-->
    <!--</div>-->
    <!--<hr />-->
    <!--<div>-->
    <!--<div>患者申领就诊卡二维码</div>-->
    <!--<button @click="onRegisterPatientCardQRCode">申领</button>-->
    <!--</div>-->
    <!--<hr />-->
    <!--<div>-->
    <!--<div>授权医生使用患者就诊卡二维码信息</div>-->
    <!--<button @click="onGrantDoctorUsePatientCardQRCode">授权</button>-->
    <!--</div>-->
    <div class="section-title">
      <div class="title">您好，李先生</div>
      <div class="sub-title">欢迎使用就诊问诊</div>

      <div class="btn">
        退出
      </div>
    </div>

    <div class="section-menus">
      <div class="title">
        就诊服务
      </div>
      <div class="menus">
        <div
          class="menu"
          v-for="(menu, key) in menus"
          :key="key"
          :style="{ background: menu.bg }"
          @click="onClickMenu(menu.id)"
        >
          <div class="icons">
            <img class="icon-main" :src="menu.icon" />
            <img
              class="icon-secondary"
              src="../../../../assets/images/patient_menu_add.png"
            />
          </div>
          <div class="menu-title">
            {{ menu.title }}
          </div>
          <div class="menu-sub-title">
            {{ menu.subTitle }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // eslint-disable-next-line no-unused-vars
import { postWithAuth, post } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import IconScan from "../../../../assets/images/patient_menu_scan.png";
import IconRecord from "../../../../assets/images/patient_menu_scan.png";
import IconCard from "../../../../assets/images/patient_menu_scan.png";
  // eslint-disable-next-line no-unused-vars
  import session from "../../../../utils/util.session";

const menus = [
  {
    id: "register-code",
    icon: IconScan,
    bg: "#E16973",
    title: "扫码挂号",
    subTitle: "您可以通过扫码功能进行快速挂号"
  },
  {
    id: "patient-card",
    icon: IconCard,
    bg: "#699DE1",
    title: "就诊卡",
    subTitle: "医生通过您出示的就诊卡二维码，了解您的过往疾病"
  },
  {
    id: "diagnose-record",
    icon: IconRecord,
    bg: "#69CBE1",
    title: "就诊记录",
    subTitle: "历史就诊记录一键查询"
  }
];

export default {
  name: "home",
  components: {},
  data() {
    return {
      menus
    };
  },
  methods: {
    onClickMenu(path) {
      this.$router.push({
        path
      });
    },
    onGrantDoctorUsePatientCardQRCode() {
      const config = {
        url: `api/v1/card/${this.patientCardQRCode}`
      };
      post(config)
        .then(res => {
          debug.log("授权医生使用患者就诊卡二维码信息成功", res);
          this.patientCardQRCode = res.code;
          this.patientCardQRCodeState = res.state;
          //session.update(res);
        })
        .catch(err => {
          debug.error("授权医生使用患者就诊卡二维码信息失败", err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
@import "home";
</style>
