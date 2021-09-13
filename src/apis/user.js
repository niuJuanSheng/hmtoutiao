import axios from '@/utils/request'
// 登录请求配置
export const login = data =>
  axios({
    url: '/login',
    method: 'post',
    data
  })
// 注册请求配置
export const register = data =>
  axios({
    url: '/register',
    method: 'post',
    data
  })
// 用户信息详情
export const user = id =>
  axios({
    url: `/user/${id}`
  })
// 文件上传接口
export const upload = data =>
  axios({
    url: '/upload',
    method: 'POST',
    data
  })
// 用户信息编辑
export const user_update = (id, data) =>
  axios({
    url: `/user_update/${id}`,
    method: 'POST',
    data
  })
// 关注用户 /user_follows/:id
export const user_follows = id =>
  axios({
    url: '/user_follows/' + id
  })
// 取消关注 /user_unfollow/:id
export const user_unfollow = id =>
  axios({
    url: '/user_unfollow/' + id
  })
// 关注列表
export const myFollow = () =>
  axios({
    url: '/user_follows'
  })
// 用户评论列表 /user_comments
export const user_comments = () =>
  axios({
    url: '/user_comments'
  })
