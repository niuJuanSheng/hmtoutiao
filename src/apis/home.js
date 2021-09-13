// 配置文章相关的 axios 请求
import axios from '@/utils/request.js'
// 栏目列表
export const category = params =>
  axios({
    url: '/category',
    params
  })
export const post = params =>
  axios({
    url: '/post',
    params
  })
// 添加栏目
export const postCategory = data =>
  axios({
    url: '/category',
    data
  })
