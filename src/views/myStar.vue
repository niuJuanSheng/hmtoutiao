<template>
  <div>
    <van-nav-bar @click-left="$router.back()" title="我的收藏" left-arrow />
    <van-swipe-cell v-for="(v, index) in starList" :key="v.id">
      <HmArticleItem @click.native="onToPage(v.id)" :obj="v"></HmArticleItem>
      <template #right>
        <van-button
          @click="onDelStar(v.id, index)"
          square
          text="删除"
          type="danger"
          class="delete-button"
        />
      </template>
    </van-swipe-cell>
  </div>
</template>

<script>
import HmArticleItem from '@/components/hmArticleItem.vue'
import { user_star, post_star } from '@/apis/new.js'
export default {
  components: { HmArticleItem },
  data() {
    return {
      starList: [] // 收藏列表
    }
  },
  methods: {
    // 取消收藏并删除文章
    onDelStar(id, i) {
      post_star(id).then(res => {
        this.$toast(res.data.message)
        this.starList.splice(i, 1)
      })
    },
    // 点击跳转文章详情页
    onToPage(id) {
      this.$router.push({
        path: '/articalDetail',
        query: {
          id
        }
      })
    }
  },
  created() {
    // 收藏列表数据获取
    user_star().then(res => {
      this.starList = res.data.data
    })
  }
}
</script>

<style scoped lang="less">
.van-button {
  height: 100%;
}
</style>
