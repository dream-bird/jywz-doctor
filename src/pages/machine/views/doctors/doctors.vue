<template>
  <div class="page-container">
    <machine-navbar>医生列表</machine-navbar>
    <div class="doctors">
      <div class="doctor" v-for="(doctor, index) in doctors" :key="index">
        <div class="avatar">
          <img src="../../../../assets/images/machine_avatar.png" />
        </div>
        <div class="info">
          <div class="user">
            <span style="font-size:24px;">{{ doctor.name }}</span>
            <span
              >{{ doctor.department }}<span style="color: #D8D8D8;"> | </span
              >{{ doctor.grade }}</span
            >
          </div>
          <div class="brief ">
            从事皮肤科临床工作多年，具有深厚的理论基础和娴熟的临床技能。
          </div>
          <div class="register">
            <div class="btn" @click="onClickDoctorRegister(doctor)">挂 号</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MachineNavbar from "../../../../components/navbar/machine-navbar";
import { get } from "../../../../utils/util.http";
import debug from "../../../../utils/util.debug";

export default {
  name: "doctors",
  components: { MachineNavbar },
  data() {
    return {
      doctors: []
    };
  },
  created() {
    this.getDoctors();
  },
  methods: {
    onClickDoctorRegister(doctor) {
      this.$router.push({
        path: `/doctor/${doctor.id}`
      });
    },
    getDoctors() {
      const config = {
        url: "api/v1/doctor"
      };
      get(config)
        .then(res => {
          debug.log("获取医生列表成功", res);
          this.doctors = res;
        })
        .catch(err => {
          debug.error("获取医生列表失败", err);
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

.doctors {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 50px 100px;

  .doctor {
    position: relative;
    margin-bottom: 50px;

    .avatar {
      position: absolute;
      left: 20px;
      height: 76px;
      width: 76px;

      img {
        width: 76px;
        height: 76px;
      }
    }

    .info {
      width: 315px;
      height: 213px;
      display: flex;
      flex-direction: column;
      margin-top: 38px;
      padding: 38px 30px 12px;
      background: #ffffff;
      box-shadow: 0 2px 9px 1px rgba(0, 0, 0, 0.09);
      border-radius: 2px;

      .user {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        font-size: 19px;
        font-weight: 400;
        color: #333333;
      }

      .brief {
        height: 70px;
        font-size: 15px;
        font-weight: 400;
        color: #999999;
        line-height: 21px;
      }

      .register {
        margin-top: 10px;
        display: flex;
        justify-content: center;

        .btn {
          width: 150px;
          height: 27px;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(24, 144, 255, 1);
          border-radius: 3px;
          font-size: 14px;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
        }
      }
    }
  }
}
</style>
