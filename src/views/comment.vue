<template>
  <div class="comment_container">
    <!-- 头部 -->
    <van-nav-bar @click-left="$router.back()" title="发表评论" left-arrow />
    <!-- 评论内容 -->
    <div class="item" v-for="(v, i) in commnetList" :key="i">
      <div class="head">
        <img :src="v.user.head_img" alt />
        <div>
          <p>{{ v.user.nickname }}</p>
          <span>{{ new Date() | formatDate }}</span>
        </div>
        <span @click="onReply(v.id)">回复</span>
      </div>
      <!-- 嵌套的评论 -->
      <HmCommentItem
        @replayCom="onReply"
        v-if="v.parent"
        :obj="v.parent"
      ></HmCommentItem>
      <div class="text">{{ v.content }}</div>
    </div>

    <!-- 底部 -->
    <Hmcomment
      ref="reply"
      :newObj="newObj"
      @upCommentData="onUpComment"
    ></Hmcomment>
  </div>
</template>

<script>
import Hmcomment from '@/components/hmcomment.vue'
import HmCommentItem from '@/components/hmCommentItem.vue'
import { post, post_comment } from '@/apis/new.js'
export default {
  components: {
    Hmcomment,
    HmCommentItem
  },
  data() {
    return {
      newObj: [], // 文章详情
      commnetList: [] // 评论列表
    }
  },
  created() {
    // 请求文章评论列表
    // post_comment(this.$route.query.id).then(res => {
    //   this.commnetList = res.data.data
    // })
    this.initCommetn()
  },
  methods: {
    // 请求评论列表数据
    onUpComment() {
      this.initCommetn()
    },
    // 封装评论列表数据显示
    initCommetn() {
      // 请求文章详情
      post(this.$route.query.id).then(res => {
        this.newObj = res.data.data
      })
      post_comment(this.$route.query.id).then(res => {
        this.commnetList = res.data.data
        // 滚动到列表顶部
        this.$nextTick(() => {
          window.scrollTo(0, 0)
        })
      })
    },
    // 点击要回复的那个对象
    onReply(id) {
      this.$refs.reply.showTextarea()
      this.$refs.reply.parent_id = id
    }
  }
}
</script>

<style scoped lang="less">
.comment_container {
  padding-bottom: 52px;
}
.item {
  padding: 10px 5px;
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
</style>
