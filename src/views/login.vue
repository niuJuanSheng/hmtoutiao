<template>
  <div id="app">
    <div class="container">
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <!-- 
          v-model 作用：
          1 可以监听表单元素的 input 事件
          2 能够将 input 事件中传递过来的值自动同步给 v-model 绑定的变量

          -->
        <!-- 用户名框 -->
        <HmInput
          :reg="/^1[3-9]\d{9}$/"
          v-model="user.username"
          placeholder="请输入手机号码"
          type="text"
          ref="username"
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
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
      <van-button @click="loginFn" icon="star-o" round type="danger" block
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import HmInput from '@/components/hmInput.vue'
import { login } from '@/apis/user'
export default {
  components: {
    HmInput
  },
  data() {
    return {
      user: {
        username: '13800138002',
        password: '123'
      }
    }
  },
  methods: {
    // 登录
    loginFn() {
      // 判定用户输入内容是否合法
      let { username, password } = this.$refs
      if (!username.isOk || !password.isOk) {
        this.$toast.fail('输入内容不合法')
        return
      }
      login(this.user).then(res => {
        if (res.data.statusCode) {
          // 请求失败
        } else {
          // 请求成功
          // console.log(res)
          localStorage.setItem('hm-token', res.data.data.token)
          localStorage.setItem('hm-userId', res.data.data.user.id)
          // console.log(this.$route.hash) // #/articalDetail?id=106
          // console.log(this.$route.hash)
          // 判定是否是从其他页面直接跳转过来的
          if (this.$route.hash) {
            this.$router.push(this.$route.hash.split('#')[1])
          } else {
            this.$router.push('/home')
          }
          // this.$router.push(this.$route.hash.split('#')[1])
        }
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
