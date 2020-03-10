<template>
  <div id="h5-input">
    <div class="label">{{ label }}</div>
    <div class="input-wrapper">
      <input
        class="input"
        :type="type"
        v-model="currentValue"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "h5-input",
  props: {
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    value: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    }
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    currentValue(val) {
      this.$emit("input", val);
    }
  },
  data() {
    return {
      currentValue: this.value
    };
  }
};
</script>

<style lang="less" scoped>
#h5-input {
  width: 750px;
  height: 94px;
  /*padding-left: 30px;*/
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  margin-bottom: 1px;
  /*border-bottom: 1px solid rgba(238, 238, 238, 1);*/

  .label {
    padding-left: 30px;
    width: 250px;
    font-size: 34px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    line-height: 48px;
  }

  .input-wrapper {
    width: 500px;

    input {
      width: 100%;
      outline: none;
      border: none;
      font-size: 34px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 48px;

      &::-webkit-input-placeholder {
        font-size: 34px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 48px;
      }

      &:-moz-placeholder {
        font-size: 34px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 48px;
      }

      &:-ms-input-placeholder {
        font-size: 34px;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        line-height: 48px;
      }
    }
  }
}
</style>
