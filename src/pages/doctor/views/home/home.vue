<template>
  <div class="page-container">
    <!--进度条-->
    <div class="loading" v-if="loading">
      <a-spin size="large" tip="等待患者授权..." />
    </div>
    <!--授权侧边弹框-->
    <a-drawer
      title="扫描患者就诊卡二维码"
      :width="400"
      placement="right"
      :closable="false"
      @close="doctorScanPatientCardQRCodeAreaVisible = false"
      :visible="doctorScanPatientCardQRCodeAreaVisible"
    >
      <input
        class="patient-card-qrcode-input"
        type="text"
        placeholder="请输入患者就诊卡二维码"
        v-model="patientCardQRCode"
      />
      <br /><br />
      <button
        class="patient-card-qrcode-button"
        @click="onConfirmScanPatientCardQRCode"
      >
        确认扫码
      </button>
    </a-drawer>
    <!--标题栏-->
    <doctor-navbar
      :department="doctor.department"
      :name="doctor.name"
      @logout="onLogout"
    ></doctor-navbar>
    <!--内容区-->
    <div class="main">
      <div class="left">
        <div class="header">
          <div class="title">问诊人员列表</div>
          <div class="count">
            当前挂号人数<span style="color: #FF5B5B;font-size: 18px;">{{
              doctor.count
            }}</span
            >人
          </div>
        </div>
        <div class="divider"></div>
        <div class="patients">
          <div
            class="patient"
            v-for="(patient, index) in patients"
            :key="index"
            @click="onScanPatientCardQRCode"
          >
            <div class="name">{{ patient.pname }}</div>
            <div class="sex-and-age">{{ patient.sex }} {{ patient.age }}</div>
            <div class="date">
              挂号时间：{{ patient.startTime | handleDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="header">
            <div class="title">患者信息</div>
            <div class="info" v-if="currentPatient">
              {{ currentPatient.name }}({{ currentPatient.idcard }})
              {{ currentPatient.sex }}
              {{ currentPatient.age }}
            </div>
          </div>
          <div class="divider"></div>
          <div class="diagnose">
            <div class="diagnose-info">
              <div class="title">诊断信息</div>
              <a-textarea
                placeholder="请输入诊断信息"
                :rows="6"
                v-model="diagnoseInfo"
              />
            </div>
            <div class="diagnose-result">
              <div class="title">诊断结果</div>
              <a-textarea
                placeholder="请输入诊断结果"
                :rows="6"
                v-model="diagnoseResult"
              />
            </div>
          </div>
          <div class="btns">
            <button style="margin-right: 15px;" @click="postDiagnoseInfo">
              保存诊断
            </button>
            <button @click="postDiagnoseResult">结束诊断</button>
          </div>
        </div>
        <div class="bottom">
          <a-tabs defaultActiveKey="1">
            <a-tab-pane tab="开处方" key="1">
              <recipe-table
                ref="recipe"
                @onCompleted="postRecipe"
              ></recipe-table>
            </a-tab-pane>
            <a-tab-pane tab="开检查" key="2" forceRender>
              <check-table ref="check" @onCompleted="postCheck"></check-table>
            </a-tab-pane>
          </a-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DoctorNavbar from "../../../../components/navbar/doctor-navbar";
import RecipeTable from "../../../../components/table/recipe-table-2";
import CheckTable from "../../../../components/table/check-table";
import { getWithAuth, postWithAuth } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";
import session from "../../../../utils/util.session";

export default {
  name: "home",
  components: { DoctorNavbar, RecipeTable, CheckTable },
  data() {
    return {
      loading: false,
      doctor: {},
      patients: [],
      doctorScanPatientCardQRCodeAreaVisible: false,
      patientCardQRCode: "",
      patientCardQRCodeState: "",
      currentPatient: undefined,
      diagnoseId: "",
      diagnoseState: "",
      diagnoseInfo: "",
      diagnoseResult: ""
    };
  },
  created() {
    this.getDoctorAndPatients();
    // 轮训，获取医生与挂号患者列表
    setInterval(() => {
      this.getDoctorAndPatients();
    }, 10000);
  },
  methods: {
    // 退出
    onLogout() {
      session.remove();
      this.$router.replace("/login");
    },
    // 重置状态
    resetPageState() {
      this.doctorScanPatientCardQRCodeAreaVisible = false;
      this.patientCardQRCode = "";
      this.patientCardQRCodeState = "";
      this.currentPatient = undefined;
      this.diagnoseId = "";
      this.diagnoseState = "";
      this.diagnoseInfo = "";
      this.diagnoseResult = "";
    },
    // step 1
    // 获取医生与挂号患者列表
    getDoctorAndPatients() {
      const config = {
        url: "api/v1/doctor1"
      };
      getWithAuth(config)
        .then(res => {
          debug.log("获取医生及挂号患者列表成功", res);
          this.doctor = {
            name: res.doctorName,
            location: res.location,
            grade: res.grade,
            department: res.department,
            count: res.count
          };
          this.patients = res.registerPatientDtoList;
        })
        .catch(err => {
          debug.error("获取医生及挂号患者列表失败", err);
        });
    },
    // step 2
    // 医生扫患者就诊卡二维码
    onScanPatientCardQRCode() {
      // 如果医生已经扫过患者就诊卡二维码或患者已经授权医生问诊，则不能再次扫描
      if (
        this.patientCardQRCodeState === "scaned" ||
        this.patientCardQRCodeState === "authed"
      ) {
        return;
      }
      this.doctorScanPatientCardQRCodeAreaVisible = true;
    },
    onConfirmScanPatientCardQRCode() {
      if (!this.patientCardQRCode) {
        this.$message.info("请输入患者就诊卡二维码");
        return;
      }
      const config = {
        url: `api/v1/card/${this.patientCardQRCode}`
      };
      getWithAuth(config)
        .then(res => {
          debug.log("医生扫描患者就诊卡二维码成功", res);
          const state = res.state;
          if (state === "lose") {
            debug.log("患者就诊卡二维码失效，提示重新扫码");
            const _this = this;
            this.$warning({
              title: "二维码已失效",
              content: "请重新扫描患者就诊卡二维码",
              onOk() {
                _this.patientCardQRCode = "";
                _this.patientCardQRCodeState = "lose";
              }
            });
          } else if (state === "wating") {
            debug.log("医生未扫描患者就诊卡二维码");
            this.patientCardQRCodeState = "wating";
          } else if (state === "scaned" || !state) {
            debug.log("医生已扫描患者就诊卡二维码，等待患者在患者端进行授权");
            this.patientCardQRCodeState = "scaned";
            this.loading = true;
            // 轮训，重复获取患者就诊卡二维码状态
            const timer = setTimeout(() => {
              this.onConfirmScanPatientCardQRCode();
              clearTimeout(timer);
            }, 2000);
          } else if (state === "authed") {
            debug.log("患者在患者端已授权");
            this.patientCardQRCodeState = "authed";
            this.doctorScanPatientCardQRCodeAreaVisible = false;
            this.currentPatient = res;
            this.onStarNewDiagnose();
            this.loading = false;
          }
        })
        .catch(err => {
          debug.error("扫描医生二维码失败", err);
        });
    },
    // step 3
    // 医生开始新诊断
    onStarNewDiagnose() {
      const config = {
        url: "api/v1/diagnose",
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        }
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生开始新诊断成功", res);
          this.diagnoseId = res.id;
          this.diagnoseState = res.state;
        })
        .catch(err => {
          debug.error("医生开始新诊断失败", err);
          this.$error({
            title: err,
            onOk() {}
          });
        });
    },
    // step 4
    // 医生提交诊断信息——保存诊断
    postDiagnoseInfo() {
      if (!this.diagnoseInfo) {
        this.$message.info("请输入诊断信息");
        return;
      }
      const config = {
        url: `api/v1/diagnose/${this.diagnoseId}/info?information=${this.diagnoseInfo}`,
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        }
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生提交诊断信息成功", res);
          this.$message.success("提交诊断信息成功");
        })
        .catch(err => {
          debug.error("医生提交诊断信息失败", err);
          this.$message.error("提交诊断信息失败");
        });
    },
    // step 5
    // 医生提交处方信息——开处方
    postRecipe(val) {
      const config = {
        url: `api/v1/diagnose/${this.diagnoseId}/recipe`,
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        },
        data: {
          medicine: val
        }
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生提交处方信息成功", res);
          this.$message.success("提交处方信息成功");
        })
        .catch(err => {
          debug.error("医生提交处方信息失败", err);
          this.$message.error("提交处方信息失败");
        });
    },
    // step 6
    // 医生提交检查信息——开检查
    postCheck(val) {
      const config = {
        url: `api/v1/diagnose/${this.diagnoseId}/check`,
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        },
        data: val
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生提交检查信息成功", res);
          this.$message.success("提交检查信息成功");
        })
        .catch(err => {
          debug.error("医生提交检查信息失败", err);
          this.$message.error("提交检查信息失败");
        });
    },
    // step 7
    // 医生提交检查结果——结束诊断
    postDiagnoseResult() {
      if (!this.diagnoseResult) {
        this.$message.info("请输入诊断结果");
        return;
      }
      const config = {
        url: `api/v1/diagnose/${this.diagnoseId}/result`,
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        },
        data: {
          result: this.diagnoseResult
        }
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生提交检查结果成功", res);
          this.onStopDiagnose();
        })
        .catch(err => {
          debug.error("医生提交检查结果失败", err);
          this.$message.error("提交检查结果失败");
        });
    },
    // step8
    // 医生完成诊断
    onStopDiagnose() {
      const config = {
        url: `api/v1/diagnose/${this.diagnoseId}`,
        headers: {
          "X-CARD-CODE": this.patientCardQRCode
        }
      };
      postWithAuth(config)
        .then(res => {
          debug.log("医生完成诊断成功", res);
          this.$message.success("完成诊断");
          // todo 结束诊断后...
          this.resetPageState();
        })
        .catch(err => {
          debug.error("医生完成诊断失败", err);
          this.$message.error("完成诊断失败");
        });
    }
  },
  filters: {
    handleDate(val) {
      if (val)
        return `${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(
          6,
          8
        )} ${val.substring(8, 10)}:${val.substring(10, 12)}`;
      return "";
    }
  }
};
</script>

<style lang="less" scoped>
.page-container {
  min-height: 100%;
  background: #f0f2f5;
  flex-direction: column;

  .loading {
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9000;
    background: rgba(240, 242, 245, 0.75);
  }

  .main {
    margin: 18px 20px;
    display: flex;

    .left {
      width: 342px;
      min-height: 677px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 1px 7px 0px rgba(153, 153, 153, 0.2);
      border-radius: 3px;

      .header {
        height: 41px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 14px;

        .title {
          font-size: 14px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }

        .count {
          font-size: 11px;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
        }
      }

      .divider {
        height: 1px;
        background: rgba(216, 216, 216, 1);
      }

      .patients {
        display: flex;
        flex-direction: column;
        align-items: center;

        .patient {
          margin: 30px;
          width: 263px;
          height: 103px;
          background: rgba(135, 182, 242, 1);
          box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.2);
          border-radius: 1px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 14px 28px;

          .name,
          .sex-and-age,
          .date {
            font-size: 14px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
          }
        }
      }
    }

    .right {
      margin-left: 20px;
      flex-grow: 1;

      .top {
        height: 273px;
        background: rgba(255, 255, 255, 1);
        margin-bottom: 20px;

        .header {
          height: 41px;
          display: flex;
          align-items: center;
          padding: 0 14px;

          .title {
            font-size: 14px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 20px;
          }

          .info {
            font-size: 11px;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 16px;
            margin-left: 20px;
          }
        }

        .divider {
          height: 1px;
          background: rgba(216, 216, 216, 1);
        }

        .diagnose {
          padding-top: 34px;
          /*padding-left: 25px;*/
          /*padding-right: 25px;*/
          display: flex;
          justify-content: space-between;

          .diagnose-info,
          .diagnose-result {
            width: 50%;
            height: 100%;
            margin: 0 50px 0 25px;
            display: flex;

            .title {
              flex-shrink: 0;
              margin-right: 25px;
            }
          }
        }

        .btns {
          margin-top: 20px;
          margin-right: 50px;
          display: flex;
          justify-content: flex-end;

          button {
            border: none;
            background: rgba(24, 144, 255, 1);
            border-radius: 3px;
            font-size: 10px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 16px;
            padding: 5px 10px;
          }
        }
      }

      .bottom {
        height: 389px;
        background: rgba(255, 255, 255, 1);
        padding: 0 14px;
      }
    }
  }
}

.patient-card-qrcode-input {
  outline: none;
  border: none;
  border-bottom: 1px solid #d8d8d8;
  padding: 7px 0;
  color: #999999;
  font-size: 14px;
  font-weight: 400;
  width: 100%;
}

.patient-card-qrcode-button {
  height: 30px;
  border: none;
  border-radius: 3px;
  background-color: #0090ff;
  box-shadow: 0 3px 18px 0 #0090ff;
  width: 100%;
  color: #ffffff;
  font-size: 14px;
  font-weight: 400;
}
</style>
