<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span :class="{ active: newObj.has_follow }" @click="onFollow">{{
        newObj.has_follow ? '已关注' : '关注'
      }}</span>
    </div>
    <div class="detail">
      <div class="title">{{ newObj.title }}</div>
      <div class="desc">
        <span>{{ newObj.user && newObj.user.nickname }}</span> &nbsp;&nbsp;
        <span>2019-9-9</span>
      </div>
      <div
        v-if="newObj.type === 1"
        class="content"
        v-html="newObj.content"
      ></div>
      <div v-if="newObj.type === 2" class="content">
        <!-- 
          :poster="defaultCover" 设置视频封面
          controls 显示视频播放控件
           -->
        <video :poster="defaultCover" :src="newObj.content" controls></video>
      </div>
      <div class="opt">
        <span @click="onLike" :class="{ active: newObj.has_like }" class="like">
          <van-icon name="good-job-o" />{{
            newObj.like_length > 0 ? newObj.like_length : '点赞'
          }}
        </span>
        <span class="chat"> <van-icon name="chat" class="w" />微信 </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="" alt />
          <div>
            <p>火星网友</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 评论底部 -->
    <Hmcomment :newObj="newObj"></Hmcomment>
  </div>
</template>

<script>
import Hmcomment from '@/components/hmcomment.vue'
import { post, post_like } from '@/apis/new.js'
import defaultCover from '@/assets/$18kuli.jpg'
import { user_follows, user_unfollow } from '@/apis/user'
export default {
  components: { Hmcomment },
  data() {
    return {
      newObj: {},
      defaultCover
    }
  },
  methods: {
    // 文章点赞
    onLike() {
      post_like(this.newObj.id).then(res => {
        this.newObj.has_like = !this.newObj.has_like
        // 判定是否点赞
        this.newObj.has_like
          ? this.newObj.like_length++
          : this.newObj.like_length--
        //  提示用户
        this.$toast(res.data.message)
      })
    },
    // 关注/取消关注的点击事件
    async onFollow() {
      if (this.newObj.has_follow) {
        // 已关注 需要取消关注
        // 取消关注
        const res = await user_unfollow(this.newObj.user.id)
        this.followFn(res, false)
      } else {
        // 未关注 需要关注
        // 关注
        const res = await user_follows(this.newObj.user.id)
        this.followFn(res, true)
      }
    },
    followFn(res, type) {
      if (res.status === 200) {
        this.$toast(res.data.message)
        this.newObj.has_follow = type
      }
    }
  },
  created() {
    const { id } = this.$route.query
    post(id).then(res => {
      this.newObj = res.data.data
      this.newObj.content =
        'http://157.122.54.189:6002' + res.data.data.content.slice(26)
    })
  }
}
</script>

<style lang="less" scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active {
      background-color: #fff;
      color: #000;
      border: 1px solid #333;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    // text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
    /deep/img {
      width: 100%;
    }
    video {
      width: 100%;
    }
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.active {
      color: red;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: (50/360) * 100vw;
        height: (50/360) * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
