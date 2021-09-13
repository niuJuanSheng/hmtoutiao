<template>
  <div class="container">
    <div class="close"><span class="iconfont iconicon-test"></span></div>
    <div class="logo"><span class="iconfont iconnew"></span></div>
    <div class="inputs">
      <!-- 用户名框 -->
      <HmInput
        v-model="user.username"
        :reg="/^1[3-9]\d{9}$/"
        placeholder="请输入手机号码"
        type="text"
        ref="username"
      ></HmInput>
      <!-- 昵称框 -->
      <HmInput
        v-model="user.nickname"
        :reg="/^[0-9a-zA-Z\u4e00-\u9fa5]{1,6}$/"
        placeholder="请输入昵称"
        type="text"
        ref="nickname"
      ></HmInput>
      <!-- 密码框 -->
      <HmInput
        v-model="user.password"
        :reg="/^.{3,16}$/"
        placeholder="请输入密码"
        type="password"
        ref="password"
      ></HmInput>
    </div>
    <p class="tips">
      有账号？
      <a href="#/login" class="">去登录</a>
    </p>
    <van-button round type="primary" block @click="registerFn">注册</van-button>
  </div>
</template>

<script>
import HmInput from '@/components/hmInput.vue'
import { register } from '@/apis/user'
export default {
  components: {
    HmInput
  },
  data() {
    return {
      user: {
        username: '13566586655',
        password: '123',
        nickname: ''
      }
    }
  },
  methods: {
    // 注册点击事件
    registerFn() {
      let { username, password, nickname } = this.$refs
      // 内容不合法判定
      if (!username.isOk || !password.isOk || !nickname.isOk) {
        return this.$toast.fail('输入内容不合法')
      }
      // 注册数据请求
      register(this.user).then(res => {
        //  注册成功 跳转登录页面
        this.$router.push({
          path: '/login'
        })
        // 注册 失败 || 成功 提示
        this.$toast({
          message: res.data.message
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  padding: 20px;
}
.close {
  span {
    font-size: (27 / 360) * 100vw;
  }
}
.logo {
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: (126 / 360) * 100vw;
    color: #d81e06;
  }
}
.inputs {
  input {
    margin-bottom: 20px;
  }
}
.tips {
  text-align: right;
  margin-bottom: 20px;
  a {
    color: #3385ff;
  }
}
</style>
