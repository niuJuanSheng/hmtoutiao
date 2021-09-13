<template>
  <div class="search_container">
    <!-- 头部 -->
    <div class="header">
      <van-nav-bar
        @click.native="onSearch(keyword, $event)"
        right-text="搜索"
        left-arrow
        @click-left="$router.back()"
      >
        <template #title>
          <!-- <van-icon name="search" size="18" /> -->
          <i class="iconfont iconsearch"></i>
          <van-field v-model="keyword" placeholder="请输入需要搜索的内容" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 历史记录 -->
    <div class="historyRecord">
      <h2>历史记录</h2>
      <a v-for="(v, i) in historyList" :key="i" @click="searchKeyword(v)"
        >{{ v }}
      </a>
    </div>
    <!-- 搜索结果 -->
    <div class="searchResult">
      <h2>搜索结果</h2>
      <template>
        <router-link
          v-for="v in searchResult"
          :key="v.id"
          :to="`/articalDetail?id=${v.id}`"
        >
          <p v-html="highLight(v.title)">{{ v.title }}</p>
        </router-link>
      </template>
      <p class="tips" v-if="total === 0">暂无数据，换个关键词试试呗~</p>
    </div>
  </div>
</template>

<script>
import { post_search } from '@/apis/new.js'
export default {
  data() {
    return {
      historyList: JSON.parse(localStorage.getItem('search_historyList')) || [], // 存储搜索记录
      keyword: '', // 搜索匹配内容
      total: null, // 匹配数据条数
      searchResult: [] // 搜索结果列表
    }
  },
  methods: {
    // 点击历史记录替换搜索框的内容
    searchKeyword(v) {
      this.keyword = v
      this.request() // 文章列表请求函数
    },
    // 关键字高亮
    highLight(title) {
      // 如果标题中包含，关键字就替换以下
      if (title.includes(this.keyword)) {
        title = title.replace(
          this.keyword,
          '<font style="color:red" >' + this.keyword + '</font>'
        )
        return title
      }
    },
    // 搜索按钮的点击事件 （检索数据）
    onSearch(keyword, e) {
      if (e.target.className.includes('van-nav-bar__text')) {
        // 判定搜索内容不能为空
        if (!keyword) {
          return this.$toast('搜索内容不能为空')
        }
        // 搜索历史存储
        if (this.historyList.indexOf(this.keyword) == -1) {
          this.historyList.push(this.keyword)
          localStorage.setItem(
            'search_historyList',
            JSON.stringify(this.historyList)
          )
        }
        this.request() // 文章列表请求函数
      }
    },
    // 文章列表请求函数
    request() {
      // 搜索文章列表请求
      post_search({ keyword: this.keyword }).then(res => {
        this.searchResult = res.data.data
        // 检索数据的条数
        this.total = res.data.total
        // console.log(res.data.total)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.delHistory {
  float: right;
  width: 20px;
  height: 20px;
  padding-right: 18px;
  line-height: 20px;
  border-radius: 10px;
}
/deep/.van-nav-bar__text {
  color: #000;
  font-size: 18px;
}
.van-field {
  flex: 1;
  border: none;
  background-color: #f7f8fa;
  border-radius: 17px;
  height: 34px;
  line-height: 17px;
  /deep/.van-field__control {
    padding-left: 20px;
  }
}

i {
  position: absolute;
  top: 14px;
  left: 92px;
  z-index: 10;
}
.historyRecord,
.searchResult {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  h2 {
    line-height: 40px;
    font-weight: bold;
  }
  > a {
    display: block;
    text-decoration: underline;
    line-height: 30px;
    color: #666;
  }
}
.tips {
  text-align: center;
  margin-top: 50px;
}
</style>
