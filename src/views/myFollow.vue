<template>
  <div class="list">
    <van-nav-bar @click-left="$router.back()" title="我的关注" left-arrow />
    <div v-for="(v, index) in followList" :key="v.id" class="box">
      <img :src="v.head_img | joinPath" alt="" />
      <div class="center">
        <p>{{ v.nickname }}</p>
        <span>{{ new Date() | formatDate }}</span>
      </div>
      <span @click="onUnFollow(v.id, index)">取消关注</span>
    </div>
  </div>
</template>

<script>
import { myFollow, user_unfollow } from '@/apis/user.js'
export default {
  data() {
    return {
      followList: [] // 关注列表
    }
  },
  created() {
    myFollow().then(res => {
      this.followList = res.data.data
    })
  },
  methods: {
    onUnFollow(id, i) {
      user_unfollow(id).then(res => {
        this.$toast(res.data.message)
        this.followList.splice(i, 1)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  .box {
    display: flex;
    padding: 25px 10px;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    > img {
      display: block;
      width: (50/360) * 100vw;
      height: (50/360) * 100vw;
      border-radius: 50%;
      padding: 0 10px;
    }
    > .center {
      flex: 1;
      > p {
        line-height: 30px;
        font-size: 14px;
      }
      > span {
        font-size: 12px;
        color: #999;
      }
    }
    > span {
      height: 30px;
      background-color: #eee;
      font-size: 13px;
      border-radius: 30px;
      line-height: 30px;
      padding: 0px 15px;
    }
  }
}
</style>
