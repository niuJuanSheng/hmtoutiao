import Vue from 'vue'
import App from './App.vue'
import './styles/index.less'
// 引入路由
import router from '@/router'
import axios from '@/utils/request.js'
// 引入vant组件库
import {
  Button,
  Toast,
  Cell,
  NavBar,
  Icon,
  Uploader,
  Dialog,
  Field,
  ActionSheet,
  Tab,
  Tabs,
  PullRefresh,
  List,
  SwipeCell,
  GridItem,
  Grid
} from 'vant'
Vue.use(Button)
Vue.use(Toast)
Vue.use(Cell)
Vue.use(NavBar)
Vue.use(Icon)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(ActionSheet)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(List)
Vue.use(SwipeCell)
Vue.use(Grid)
Vue.use(GridItem)
Vue.config.productionTip = false
// 全局过滤器 格式化时间
Vue.filter('formatDate', val => {
  return val.toLocaleDateString()
})
// 图片路径拼接过滤器
Vue.filter('joinPath', val => {
  // 判断是否有 url 路径
  if (!val) return val
  // 判断是否含有前缀
  if (val.indexOf('http') != -1) {
    return val
  } else {
    // 添加前缀
    return axios.defaults.baseURL + val
  }
})
// 自定义指令 聚焦 focus
Vue.directive('focus', {
  inserted(el) {
    el.focus()
  }
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
