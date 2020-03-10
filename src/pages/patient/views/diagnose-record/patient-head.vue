<template>
  <div id="applyTitle" :style="{ background: background}">
    <div id="applyClose" @click="goBack" :style="{color: color}">
      <img id="applyCloseImg" src="../../../../assets/image/返回2.png">
      返回
    </div>
    <div id="applyText" :style="{color: color}">{{title}}</div>
  </div>
</template>

<script>
    export default {
        name: "patient-head",
      props:['background','color','title'],
      methods: {
        goBack() {
          this.$router.go(-1);//后退一页
        },
      }
    }
</script>

<style scoped>
  #applyTitle{
    width: 7.50rem;
    height:1.28rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    background:rgba(255,255,255,1);
  }


  #applyClose{
    display: flex;
    align-items: center;
    font-size:.32rem;
    font-family:PingFangSC-Regular,PingFangSC,serif;
    font-weight:400;
    color:rgba(0,144,255,1);
    margin-left: .31rem;
  }
  #applyCloseImg{
    display: flex;
    align-items: center;
    width:.23rem;
    height:.33rem;
    background:rgba(0,144,255,1);
  }
  #applyText{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size:.36rem;
    font-family:PingFangSC-Medium,PingFangSC;
    font-weight:500;
    color:rgba(51,51,51,1);
    margin-left: 2.00rem;
    height:1.28rem;
  }
</style>
<style>
  .ant-message {
    font-size: .28rem;
  }
</style>
