<template>
  <div class="myComment_container">
    <!-- 头部 -->
    <div class="header">
      <p class="header_top"></p>
      <van-nav-bar @click-left="$router.back()" title="我的跟帖" left-arrow />
    </div>
    <!-- 内容 -->
    <div v-for="v in userComment" :key="v.id" class="content">
      <p class="content_date">
        {{ v.create_date && v.create_date }}
      </p>
      <p class="content_main">{{ v.content }}</p>
      <div
        @click="$router.push('/articalDetail?id=' + v.post.id)"
        class="content_original"
      >
        <p class="title">原文：{{ v.post.title }}</p>
        <i class="icon iconfont iconjiantou1"></i>
      </div>
    </div>
    <div @click="$router.push('/notFound')" class="more">更多跟帖</div>
  </div>
</template>

<script>
import { user_comments } from '@/apis/user.js'
export default {
  data() {
    return {
      userComment: [] // 我的评论
    }
  },
  created() {
    user_comments().then(res => {
      this.userComment = res.data.data
      // console.log(res)
    })
  }
}
</script>

<style scoped lang="less">
.myComment_container {
  background-color: #f2f2f2;
}
.content_original {
  position: relative;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 100px;
}
.icon {
  position: absolute;
  top: 2px;
  right: 0;
}
.header {
  .header_top {
    height: 30px;
    background-color: #757575;
    margin: 0;
  }
  /deep/.van-nav-bar__content {
    font-weight: 700;
  }
}
.content {
  padding: 50px 20px 20px;
  border-bottom: 1px solid #ccc;
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
</style>
