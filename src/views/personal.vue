<template>
  <div class="personal">
    <router-link to="/edit_profile">
      <div class="profile">
        <img
          :src="
            userInfo.head_img ||
              'http://img1.imgtn.bdimg.com/it/u=3757784226,1202878475&fm=26&gp=0.jpg'
          "
          alt
        />
        <div class="profile-center">
          <div class="name">
            <span
              class="iconfont "
              :class="{
                iconxingbienan: userInfo.gender === 1,
                iconxingbienv: userInfo.gender === 0
              }"
            ></span
            >{{ userInfo.nickname }}
          </div>
          <div class="time">{{ new Date() | formatDate }}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <div class="content">
      <van-cell
        @click="$router.push('/myFollow')"
        title="我的关注"
        is-link
        value="关注的用户"
      />
      <van-cell
        @click="$router.push('/myComment')"
        title="我的跟帖"
        is-link
        value="跟帖/回复"
      />
      <van-cell
        @click="$router.push('/myStar')"
        title="我的收藏"
        is-link
        value="文章/视频"
      />
      <van-cell @click="$router.push('/edit_profile')" title="设置" is-link />
      <van-button @click="exitFn" round type="warning" block>退出</van-button>
    </div>
  </div>
</template>

<script>
import { user } from '@/apis/user'
export default {
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  created() {
    const id = localStorage.getItem('hm-userId')
    const token = localStorage.getItem('hm-token')
    // 用户信息请求
    user(id, token).then(res => {
      this.userInfo = res.data.data
    })
  },
  methods: {
    // 退出登录
    exitFn() {
      localStorage.removeItem('hm-userId') // 删除 id
      localStorage.removeItem('hm-token') // 删除 token
      this.$router.push('/login') // 跳转到登录页面
    }
  }
}
</script>

<style scoped lang="less">
.personal {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
}
a {
  color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: (70 / 360) * 100vw;
    height: (70 / 360) * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.van-cell {
  background-color: #eee;
  border-bottom: 1px solid #ddd;
}
.van-button {
  display: block;
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
</style>
