<template>
  <div class ="h5-container">
    <PatientHead background="#108EE9" color="white" title="就诊记录详情"></PatientHead>
    <div id="partOne">
      <div id="partOne_Text1" v-text="'测试医生 ' + department + '|' + '主任医师'">
        刘秀梅  心内科丨副主任医师
      </div>
      <div id="partOne_Text2"  v-text="diagnoseDTO.starttime">
        2019-09-23 15:00:00
      </div>
    </div>
    <div id="partTwo">
      <div id="partTwo_Top">
        诊断结果
      </div>
      <div id="partTwo_Mid" v-text="diagnoseDTO.totalmoney+'￥'">
        480.00￥
      </div>
      <div id="partTwo_Bottom" v-text="diagnoseDTO.result">
        流行性感冒
      </div>
    </div>
    <div id="partThree">
      <div id="partThree_Top1">
      </div>
      <div id="partThree_Top2">
        处方
      </div>
      <hr>
      <div id="sumMedi"
           v-for="(item,index) in diagnoseDTO.recipe.medicine" :key="index">
        <div id="partThree_Mid1" v-text="item.medicinename">
          阿司匹林
        </div>
        <div id="partThree_Mid2" v-text="'X'+item.medicinecnt + item.dosesiz" >
          x3(盒）
        </div>
        <div id="partThree_Mid3" v-text="item.money + '￥'">
          100.00￥
        </div>
      </div>
      <div id="partThree_Bottom">
        合计：
        <div id="partThree_Bottom1" v-text="diagnoseDTO.drugmoney + '￥'">
          200.00￥
        </div>
      </div>
    </div>

    <div id="partFour">
      <div id="partFour_Top1">
      </div>
      <div id="partFour_Top2">
        检查记录
      </div>
      <hr>
      <div v-for="(item,index) in diagnoseDTO.checkDTOS" :key="index">
        <div id="partFour_Mid1" v-text="item.description">
          血常规
        </div>
        <div id="partFour_Mid2" >
          X1
        </div>
        <div id="partFour_Mid3" v-text="item.money + '￥'" >
          100.00￥
        </div>
      </div>
      <div id="partFour_Bottom">
        合计：
        <div id="partFour_Bottom1" v-text="diagnoseDTO.checkmoney + '￥'">
          200.00￥
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import PatientHead from "./patient-head"
  export default {
    name: "pdetail",
    components: {PatientHead},
    data() {
      return {
        Page: [],
        arrDiagnose: [],
        // id: '',
        diagnoseDTO: {
          checkDTOS: [],//检查处方
          checkmoney: '',// 检查费 ,
          drugmoney: '',// 药费 ,
          endtime: '',// 结束时间 ,
          id: '',// 诊断编号 ,
          patientage: '',// 患者年龄 ,
          patientidcard: '',// 患者身份证号 ,
          patientname: '',// 患者姓名 ,
          patientsex: '',//患者性别 ,
          recipe: {},//,药品处方
          result: '',//诊断结果 ,
          starttime: '',//开始时间 ,
          state: '',//状态 ,
          totalmoney: ''// 诊断总金额
        },
      }
    },
    props:['id','department'],
    mounted: function() {
      this.showHistory();
    },

    methods: {
      showHistory(){
        let _self = this;
        _self.$axios.get("/api/v1/diagnose?pid="+_self.idcardno+"&pageNo=1&pageSize=20").then(response => {
          _self.Page=response.data;
          _self.arrDiagnose=response.data.content;
          for (var i=0 ;i<_self.arrDiagnose.length;i++){
            var c = _self.arrDiagnose[i];
            if (c.id===_self.$route.params.id){
              _self.diagnoseDTO = c;
            }
          }
        })
                .catch(function(err) {
                  if (err.response.data.error_description!==""||err.response.data.error_description!=='undefind'){
                    _self.$message.error('获取历史记录失败，失败信息：' + err.response.data.error_description)

                  }else{
                    _self.$message.error('获取历史记录失败');
                    return false;
                  }
                });
      },

    }
  }
</script>

<style scoped>
  #partOne{
    width:7.50rem;
    height:2.20rem;
    background:rgba(16,142,233,1);
    text-align: center;
  }

  #partOne_Text1{
    width:6.60rem;
    height:.55rem;
    font-size:.34rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.55rem;
    position: relative;
    top:.44rem;
  }
  #partOne_Text2{
    width:3.97rem;
    height:.55rem;
    font-size:.30rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(255,255,255,1);
    line-height:.55rem;
    position: relative;
    top:.50rem;
    left: .60rem;

  }
  #partTwo{
    width:6.22rem;
    height:1.52rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem .03rem .10rem 0rem rgba(0,0,0,0.2);
    border-radius:.18rem;
    position: absolute;
    top:2.94rem;
    left:.64rem;
  }
  #partTwo_Top{
    width:1.20rem;
    height:.42rem;
    font-size:.30rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.42rem;
    margin-left: .37rem;
    margin-top: .22rem;
  }
  #partTwo_Mid{
    width:1.71rem;
    height:.56rem;
    font-size:.40rem;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(255,30,30,1);
    line-height:.56rem;
    float: right;
    margin-right:.40rem;
  }
  #partTwo_Bottom{
    width:1.50rem;
    height:.42rem;
    font-size:.30rem;
    font-family:PingFangSC-Medium,PingFang SC;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:.42rem;
    margin-left: .48rem;
    margin-top: .30rem;
  }
  #partThree{
    width:7.10rem;
    height:3.23rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem 0.02rem .10rem 0rem rgba(0,0,0,0.1);
    margin: 0 auto;
    margin-top: 1.60rem;
    display: inline-block;
  }
  #sumMedi{
    font-size:.37rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.52rem;
    display: inline-block;
  }
  #partThree_Top1{
    width:.10rem;
    height:.29rem;
    background:rgba(0,144,255,1);
    margin-left: .20rem;
    position: relative;
    top: .30rem;
  }
  #partThree_Top2{
    width:.64rem;
    height:.45rem;
    font-size:.32rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(0,144,255,1);
    line-height:.45rem;
    position: relative;
    top: -.08rem;
    left: .39rem;

  }
  #partThree_Mid1{
    width:1.72rem;
    height:.40rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.40rem;
    margin-left: .44rem;
    margin-top: .21rem;

  }
  #partThree_Mid2{
    width:2.00rem;
    height:.40rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.40rem;
    margin-left: 2.31rem;
    margin-top: -.40rem;
  }
  #partThree_Mid3{
    width:2.00rem;
    height:.55rem;
    font-size:.30rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(242,71,36,1);
    line-height:.55rem;
    -webkit-background-clip:text;
    margin-left: 4.70rem;
    margin-top: -.50rem;
    text-align: right;
  }
  #partThree_Bottom{
    width:1.11rem;
    height:.59rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.52rem;
    margin-bottom: .05rem;
    margin-left: 5.00rem;
    display: inline-block;
  }
  #partThree_Bottom1{
    width:.47rem;
    height:.45rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(51,51,51,1);
    color:red;
    line-height:.52rem;
    margin-top: -.50rem;
    margin-left: .90rem;
    text-align: right;
  }

  #partFour{
    width:7.1rem;
    height:3.23rem;
    background:rgba(255,255,255,1);
    box-shadow:0rem .03rem .13rem 0rem rgba(0,0,0,0.1);
    margin: 0 auto;
    margin-bottom: .60rem;
  }
  #partFour_Top1{
    width:.13rem;
    height:.38rem;
    background:rgba(0,144,255,1);
    margin-left: .26rem;
    position: relative;
    top: .30rem;
  }
  #partFour_Top2{
    width:2.00rem;
    height:.59rem;
    font-size:.32rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(0,144,255,1);
    line-height:.59rem;
    position: relative;
    top: -.20rem;
    left: 1.00rem;

  }
  #partFour_Mid1{
    width:3.00rem;
    height:.52rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.52rem;
    margin-left: .57rem;
    margin-top: .27rem;

  }
  #partFour_Mid2{
    width:1.31rem;
    height:.52rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:.52rem;
    margin-left: 3.50rem;
    margin-top: -.50rem;
  }
  #partFour_Mid3{
    width:2.00rem;
    height:.55rem;
    font-size:.30rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(242,71,36,1);
    line-height:.55rem;
    -webkit-background-clip:text;
    margin-left: 4.70rem;
    margin-top: -.50rem;
    text-align: right;
  }
  #partFour_Bottom{
    width:1.11rem;
    height:.59rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:.52rem;
    margin-top: .60rem;
    margin-left: 5.00rem;
  }
  #partFour_Bottom1{
    width:.47rem;
    height:.59rem;
    font-size:.28rem;
    font-family:PingFangSC-Regular,PingFangSC;
    font-weight:400;
    color:red;
    line-height:.52rem;
    margin-top: -.50rem;
    margin-left: .90rem;
    text-align: right;
  }
  .h5-container {
    width: 7.50rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-size: 100%;
  }
</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
