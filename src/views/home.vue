<template>
  <div>
    <!-- 头部 -->
    <van-nav-bar>
      <template #left>
        <span class="iconfont iconnew index-new"></span>
      </template>
      <template #title>
        <div @click="$router.push('/search')" class="index-header-search">
          <van-icon name="search" color="#fff" size="20" />
          搜索商品
        </div>
      </template>
      <template #right>
        <van-icon
          @click="$router.push('/personal')"
          name="manager-o"
          color="#fff"
          size="25"
        />
      </template>
    </van-nav-bar>
    <!-- 内容 -->
    <van-tabs
      @click.native="toPage"
      v-model="curIndex"
      @change="getCategoryData"
    >
      <van-tab v-for="v in categoryList" :title="v.name" :key="v.id">
        <!-- 
            新闻有三种类型的展示方式：
            1、左右结构
            2、上下结构，上面试标题，下面是3张图片
            3、上下结构，上标题，下面是视频
        -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
          >
            <HmArticleItem
              v-for="v in newList"
              :key="v.id"
              :obj="v"
              @click.native="toDetail(v.id)"
            ></HmArticleItem>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import HmArticleItem from '@/components/hmArticleItem.vue'
import { category, post } from '@/apis/home.js'
export default {
  data() {
    return {
      categoryList: [], // 文章导航列表
      newList: [], // 文章内容列表
      isLoading: false,
      curIndex: localStorage.getItem('hm-token') ? 1 : 0, // 当前栏目下标
      loading: false, // 控制加载状态
      finished: false, // 上拉加载完的变量控制
      pageIndex: 1, // 当前页数
      pageSize: 10 // 数据条数
    }
  },
  components: { HmArticleItem },
  async created() {
    // console.log(this.curIndex)
    // 文章头部导航列表的 axios 请求
    // 本地获取栏目数据
    if (localStorage.getItem('categoryList')) {
      let categoryList = JSON.parse(localStorage.getItem('categoryList'))
      let defaultCategoryList = JSON.parse(
        localStorage.getItem('defaultCategoryList')
      )
      this.categoryList = [...defaultCategoryList, ...categoryList]
      // 判断用户是否登录来决定默认栏目数据
      if (localStorage.getItem('hm-token-67') && defaultCate.length == 1) {
        let res = await category()
        this.categoryList = [res.data.data[0], ...this.categoryList]
      } else {
        // 未登录并且已经保存了“关注”栏目
        !localStorage.getItem('hm-token-67') && this.categoryList.splice(0, 1)
      }
    } else {
      const res = await category()
      this.categoryList = res.data.data
    }

    this.getCatetoryList()
    // post({
    //   category: this.categoryList[this.curIndex].id,
    //   pageIndex: this.pageIndex,
    //   pageSize: this.pageSize
    // }).then(res => {
    //   this.newList = res.data.data
    //   console.log(res)
    // })
  },
  methods: {
    // 跳转页面
    toPage(e) {
      if (e.target.className.indexOf('van-tabs__wrap') != -1) {
        this.$router.push({
          path: '/category'
        })
      }
    },
    // 跳转到新闻详情
    toDetail(id) {
      this.$router.push({
        path: '/articalDetail',
        query: {
          id
        }
      })
    },
    // 上拉加载
    onLoad() {
      this.pageIndex++
      this.getCatetoryList()
    },
    // 新闻列表下拉时触发的函数
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功')
      }, 1000)
      this.newList = []
      this.pageIndex = 1
      this.finished = false
      this.getCatetoryList()
    },
    // 切换文章列表栏目 change 事件
    getCategoryData(name, title) {
      // console.log(name, title)
      // console.log(this.categoryList[name].id)
      this.curIndex = name
      // 切换栏目时将数组清空
      this.newList = []
      // 数据初始化
      this.pageIndex = 1
      this.finished = false
      this.getCatetoryList()
    },

    // 封装获取文章列表数据
    getCatetoryList() {
      post({
        category: this.categoryList[this.curIndex].id,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }).then(res => {
        this.isLoading = false
        this.loading = false
        // 当请求回来的数据的长度小于定义的数据条数时，说明数据已经是最后一页
        if (res.data.data.length < this.pageSize) {
          this.finished = true
        }
        // 对加载的数据进行拼接
        this.newList = [...this.newList, ...res.data.data]
      })
    }
  }
}
</script>

<style lang="less" scoped>
// 添加加号
/deep/.van-tabs__wrap {
  padding-right: 44px;
  &::after {
    content: '+';
    position: absolute;
    width: 44px;
    height: 44px;
    font-size: 30px;
    background-color: #fff;
    top: 0;
    right: 0;
    text-align: center;
    line-height: 44px;
  }
}

.van-nav-bar {
  background-color: red;
}
.index-new {
  font-size: 50px;
  color: #fff;
}
/deep/.van-nav-bar__title {
  width: 60%;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 35px;
  color: #fff;
  height: 38px;
  line-height: 38px;
}
// 新闻列表布局
.single {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  .left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
    .content {
      font-size: 14px;
      padding: 0px 5px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .info {
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    > span:nth-of-type(1) {
      padding-right: 15px;
    }
  }
  img {
    width: 120/360 * 100vw;
    height: 70/360 * 100vw;
    object-fit: cover;
    padding-right: 5px;
  }
}
</style>
