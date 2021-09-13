import axios from '@/utils/request.js'
// 文章详情
export const post = id =>
  axios({
    url: '/post/' + id
  })
// 文章点赞 /post_like/:id
export const post_like = id =>
  axios({
    url: '/post_like/' + id
  })
// 文章收藏 /post_star/:id
export const post_star = id => axios({ url: '/post_star/' + id })
// 收藏文章列表 /user_star
export const user_star = () => axios({ url: '/user_star' })
// 评论列表  /post_comment/:id
export const post_comment = id => axios({ url: '/post_comment/' + id })
// 发布评论 /post_comment/:id post
export const postComment = (id, data) =>
  axios({
    url: '/post_comment/' + id,
    method: 'POST',
    data
  })
// 文章搜索 /post_search
export const post_search = params =>
  axios({
    url: '/post_search',
    params
  })
