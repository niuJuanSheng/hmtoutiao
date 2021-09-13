<template>
  <input
    @blur="blurFn"
    :[attr]="{ success: isOk, error: !isOk }"
    :value="value"
    class="hmInput"
    @input="inputFn"
  />
</template>

<script>
export default {
  props: {
    value: String,
    reg: RegExp
  },
  data() {
    return {
      isOk: true,
      attr: ""
    };
  },
  // 内容不合法, 阻止 axios 请求
  created() {
    if (this.reg.test(this.value)) {
      this.isOk = true;
    } else {
      this.isOk = false;
    }
  },
  methods: {
    // input 失焦事件
    blurFn() {
      this.attr = "class";
      if (this.reg.test(this.value)) {
        this.isOk = true;
      } else {
        this.$toast.fail("内容输入不正确！");
        this.isOk = false;
      }
    },
    // 向父组件传递 input 框数据的改变
    inputFn(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style scoped lang="less">
.hmInput {
  border: none;
  border-bottom: 2px solid #ddd;
  width: 100%;
  padding: 10px 5px;
}
.success {
  color: green;
  border-color: green;
}
.error {
  color: red;
  border-color: red;
}
</style>
