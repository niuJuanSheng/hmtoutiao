<template>
  <div class="comment">
    <!-- 展示 input 框 -->
    <div v-show="!isFocus" class="addcomment">
      <input @focus="showTextarea" type="text" placeholder="写跟帖" />
      <span class="comment" @click="toComment">
        <i class="iconfont iconpinglun-"></i>
        <!-- 评论数量 -->
        <em>{{ newObj.comment_length }}</em>
      </span>
      <i
        :class="{ red: newObj.has_star }"
        class="iconfont iconshoucang"
        @click="onStar"
      ></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <!-- 评论区域 -->
    <div v-if="isFocus" class="inputcomment">
      <!-- @blur="blurTextarea" -->
      <textarea v-focus v-model="content" ref="commtext" rows="5"></textarea>
      <div>
        <span @click="sendComment">发 送</span>
        <span @click="unShowTextarea">取 消</span>
      </div>
    </div>
  </div>
</template>

<script>
import { post_star, postComment } from '@/apis/new.js'
export default {
  props: ['newObj'],
  data() {
    return {
      isFocus: false, // 显示隐藏多行文本域
      content: '', // 输入的评论内容
      parent_id: '' // 需要回复的id
    }
  },
  methods: {
    // 多行文本域失焦 隐藏多行文本域 (保存内容)
    // blurTextarea() {
    //   this.isFocus = false // 隐藏多行文本域
    // },
    // 发布评论
    async sendComment() {
      const { id } = this.$route.query
      // 评论内容不能为空
      if (!this.content) return this.$toast('不能评论空白信息！')
      let data = { content: this.content } // 评论内容
      // 判定是否有传入 id
      if (this.parent_id) {
        data.parent_id = this.parent_id
      }
      // 发表评论请求
      const res = await postComment(id, data)
      this.$toast(res.data.message) // 提示用户
      this.$emit('upCommentData') // 子传父，评论实时更新
      this.content = '' // 评论完毕清空输入框内容
      this.isFocus = false // 隐藏文本域输入框
      // 每次回复完后都要重置 id
      this.parent_id = '' // 重置 id
    },
    // 点击取消隐藏文本域
    unShowTextarea() {
      this.isFocus = false // 隐藏多行文本域
      this.content = '' // 清空输入的内容
      this.parent_id = '' // 重置 id
    },
    // 点击显示评论文本域框
    showTextarea() {
      this.isFocus = true // 显示多行文本域
    },
    // 跳转到发表评论的页面
    toComment() {
      this.$router.push({
        path: '/comment',
        query: {
          id: this.newObj.id
        }
      })
    },
    // 收藏功能
    onStar() {
      post_star(this.newObj.id).then(res => {
        console.log(res)
        this.newObj.has_star = !this.newObj.has_star
        // 提醒用户
        this.$toast(res.data.message)
      })
    }
  }
}
</script>

<style scoped lang="less">
.comment {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  .addcomment {
    background-color: #fff;
    .star-active {
      color: red;
    }
  }
}
.inputcomment {
  padding: 10px;
  box-sizing: border-box;
  width: 100%;
  display: flex;
  background-color: #fff;
  align-items: flex-end;
  textarea {
    flex: 3;
    background-color: #eee;
    border: none;
    border-radius: 10px;
    padding: 10px;
  }
  div {
    padding: 20px;
  }
  span {
    display: block;
    flex: 1;
    height: 24px;
    line-height: 24px;
    padding: 0 10px;
    background-color: #f00;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    font-size: 13px;
  }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
.red {
  color: red;
}
</style>
