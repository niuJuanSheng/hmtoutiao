<template>
  <div class="commentItem">
    <div class="top">
      <div class="left">
        <span>{{ obj.user.nickname }}</span> &nbsp;&nbsp;&nbsp;
        <span>{{ new Date() | formatDate }}</span>
      </div>
      <div class="bottom">{{ obj.content }}</div>
      <span @click="onReply(obj.id)">回复</span>
    </div>
    <HmCommentItem
      v-if="obj.parent"
      :obj="obj.parent"
      @replayCom="onReply"
    ></HmCommentItem>
    <div class="bottom">{{ obj.content.parent }}</div>
  </div>
</template>

<script>
export default {
  name: 'HmCommentItem',
  props: ['obj'],
  data() {
    return {}
  },
  methods: {
    // 子传父 把需要回复的评论的 id 传递过去
    onReply(id) {
      this.$emit('replayCom', id)
    }
  }
}
</script>

<style scoped lang="less">
.commentItem {
  border: 1px solid #ccc;
  padding: 5px;
  margin-top: 10px;
  .top {
    font-size: 12px;
    color: #aaa;
    display: flex;
    justify-content: space-between;
  }
  .bottom {
    font-size: 13px;
    line-height: 40px;
  }
}
</style>
