<template>
  <div>
    <!-- 标题 -->
    <van-nav-bar @click-left="$router.back()" title="个人信息编辑" left-arrow>
      <template #right>
        <van-icon @click="$router.push('/home')" name="wap-home-o" size="18" />
      </template>
    </van-nav-bar>
    <!-- 头像 -->
    <div class="head_img">
      <img :src="userInfo.head_img || defaultImg" alt="" />
      <van-uploader :after-read="afterRead" />
    </div>
    <!-- 昵称 、密码、性别 -->
    <van-cell
      title="昵称"
      @click="nicknameDialog"
      is-link
      :value="userInfo.nickname"
    />
    <!-- 昵称 -->
    <van-dialog
      v-model="nicknameShow"
      title="修改昵称"
      @confirm="confirmnickname"
      show-cancel-button
      :beforeClose="nicknameBeforeClose"
    >
      <van-field
        v-model="nickname"
        name="昵称"
        label="昵称"
        placeholder="昵称"
        required
      />
    </van-dialog>
    <van-cell
      title="密码"
      is-link
      value="******"
      @click="passwordShow = true"
    />
    <!-- 密码 -->
    <van-dialog
      @confirm="onConfirm"
      :before-close="passwordClose"
      v-model="passwordShow"
      title="编辑密码"
      show-cancel-button
    >
      <van-field
        v-model="password"
        name="原密码"
        label="原密码"
        placeholder="请输入原密码"
        required
      />
      <van-field
        v-model="newPassword"
        name="新密码"
        label="新密码"
        placeholder="请输入新密码"
        required
      />
    </van-dialog>
    <!-- 性别 -->
    <van-cell
      title="性别"
      is-link
      :value="userInfo.gender === 1 ? '男' : '女'"
      @click="genderShow = true"
    />
    <van-action-sheet
      v-model="genderShow"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import defaultImg from '@/assets/$18kuli.jpg'
import { user, upload, user_update } from '@/apis/user'
import axios from '@/utils/request'
export default {
  data() {
    return {
      defaultImg, // 默认头像
      userInfo: {}, // 用户信息
      nicknameShow: false,
      nickname: '', // 用户昵称
      password: '', // 原密码
      newPassword: '', // 新密码
      passwordShow: false,
      genderShow: false,
      actions: [{ name: '女' }, { name: '男' }],
      id: localStorage.getItem('hm-userId'), // 登录 id
      token: localStorage.getItem('hm-token') // 登录需要验证的 token
    }
  },
  created() {
    // 用户信息请求
    user(this.id, this.token).then(res => {
      if (res.data.message === '获取成功') {
        this.userInfo = res.data.data
      }
    })
  },
  methods: {
    // 密码修改
    passwordClose(action, done) {
      console.log(action)
      if (action === 'cancel') {
        this.password = ''
        this.newPassword = ''
        done()
        return
      }
      if (this.password != this.userInfo.password) {
        console.log('原密码输入失败')
        // 原密码出错提示
        this.$toast.fail('原密码错误')
        done(false)
      } else if (this.password === this.newPassword) {
        this.$toast.fail('原密码和新密码不能一样')
        done(false)
      } else if (!/^.{3,16}$/.test(this.newPassword)) {
        this.$toast.fail('密码长度过长或过短')
        done(false)
      } else if (this.password === this.userInfo.password) {
        console.log('原密码输入成功')
        done()
      }
    },
    // 新密码
    onConfirm() {
      console.log(this.newPassword)
      user_update(this.id, {
        password: this.newPassword
      }).then(res => {
        // console.log(res)
        // console.log(this.userInfo)
        // 动态渲染
        console.log(res)
        this.password = ''
        this.newPassword = ''
      })
    },
    // 性别修改
    onSelect(action, index) {
      console.log(action, index)
      user_update(this.id, {
        gender: index
      }).then(res => {
        // console.log(res)
        // console.log(this.userInfo)
        // 动态渲染
        this.userInfo.gender = res.data.data.gender
      })
      this.genderShow = false
    },
    // 显示修改昵称弹出框
    nicknameDialog() {
      this.nicknameShow = true
      this.nickname = this.userInfo.nickname
    },
    // 修改昵称
    confirmnickname() {
      // 用户昵称校验
      if (this.nickname.length > 1 && this.nickname.length < 8) {
        user_update(this.id, {
          nickname: this.nickname
        }).then(res => {
          // console.log(res)
          // console.log(this.userInfo)
          this.userInfo.nickname = res.data.data.nickname
        })
      } else {
        // 昵称不合法提示
        this.$toast.fail('输入内容不合法！')
      }
    },
    // 弹窗关闭前的回调
    nicknameBeforeClose(action, done) {
      if (action === 'cancel') return done()
      // 调用 done() 后关闭弹窗，
      // 调用 done(false) 阻止弹窗关闭
      if (this.nickname.length > 1 && this.nickname.length < 8) {
        done()
      } else {
        done(false)
      }
    },
    // 头像文件上传
    async afterRead(file) {
      // 此时可以自行将文件上传至服务器
      // console.log(file)
      const formData = new FormData()
      formData.append('file', file.file)
      const res = await upload(formData)
      // console.log(res)
      user_update(this.id, {
        head_img: axios.defaults.baseURL + res.data.data.url
      }).then(res => {
        // console.log(res)
        // console.log(this.userInfo)
        this.userInfo.head_img = res.data.data.head_img
      })
    }
  }
}
</script>

<style lang="less" scoped>
// less 样式穿透 /deep/
/deep/.van-nav-bar {
  height: 60px;
  line-height: 60px;
  border-bottom: 2px solid #ccc;
  div {
    height: 100%;
  }
}
.head_img {
  position: relative;
  text-align: center;
  margin: 15px 0;
  img {
    width: 30%;
  }
}
.van-icon {
  color: #333;
}
.van-uploader {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  width: 35%;
  opacity: 0;
  /deep/.van-uploader__upload {
    width: 100%;
    height: 120px;
  }
}
</style>
