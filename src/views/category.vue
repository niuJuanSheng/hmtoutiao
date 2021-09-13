<template>
  <div>
    <van-nav-bar @click-left="$router.back()" title="栏目管理" left-arrow />
    <div class="categoryBox">
      <h1>点击删除频道</h1>
      <van-grid :gutter="10">
        <van-grid-item
          @click="onDelCategoryList(i)"
          v-for="(v, i) in categoryList"
          :key="v.id"
          :text="v.name"
        />
      </van-grid>
    </div>
    <div class="categoryBox">
      <h1>点击添加频道</h1>
      <van-grid :gutter="10">
        <van-grid-item
          @click="addCategoryList(i)"
          v-for="(v, i) in delCategoryList"
          :key="v.id"
          :text="v.name"
        />
      </van-grid>
    </div>
  </div>
</template>

<script>
import { category } from '@/apis/home.js'
export default {
  data() {
    return {
      categoryList: [], // 栏目列表
      delCategoryList: [], //删除栏目列表
      defaultCategoryList: [] // 默认的栏目列表
    }
  },
  watch: {
    // 栏目数据侦听
    categoryList: {
      deep: true,
      handler() {
        localStorage.setItem('categoryList', JSON.stringify(this.categoryList))
        localStorage.setItem(
          'delCategoryList',
          JSON.stringify(this.delCategoryList)
        )
        localStorage.setItem(
          'defaultCategoryList',
          JSON.stringify(this.defaultCategoryList)
        )
      }
    }
  },
  created() {
    // 获取栏目列表
    if (localStorage.getItem('categoryList')) {
      this.categoryList = JSON.parse(localStorage.getItem('categoryList'))
      this.delCategoryList = JSON.parse(localStorage.getItem('delCategoryList'))
      this.defaultCategoryList = JSON.parse(
        localStorage.getItem('defaultCategoryList')
      )
      return
    }
    // 栏目数据请求函数
    category().then(res => {
      // this.categoryList = res.data.data
      // 排除 ‘关注’ 和 ‘头条’
      if (localStorage.getItem('hm-token')) {
        this.defaultCategoryList = res.data.data.splice(0, 2)
        this.categoryList = res.data.data
      } else {
        this.defaultCategoryList = res.data.data.splice(0, 1)
        this.categoryList = res.data.data
      }
    })
  },
  methods: {
    // 删除栏目
    onDelCategoryList(i) {
      let res = this.categoryList.splice(i, 1)
      this.delCategoryList.push(res[0])
    },
    // 添加栏目
    addCategoryList(i) {
      let res = this.delCategoryList.splice(i, 1)
      this.categoryList.push(res[0])
    }
  }
}
</script>

<style lang="less" scoped>
.categoryBox {
  margin-top: 20px;
  h1 {
    font-size: 18px;
    padding: 0 10px;
  }
}
</style>
