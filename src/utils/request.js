import axios from 'axios'
// axios.defaults.baseURL = 'http://157.122.54.189:6002'
axios.defaults.baseURL = 'http://127.0.0.1:3000'
// 添加请求拦截
axios.interceptors.request.use(
  config => {
    // console.log(config)
    const token = localStorage.getItem('hm-token')
    config.headers.Authorization = token
    return config
  },
  error => Promise.reject('请求出错' + error)
)
// 添加响应拦截
axios.interceptors.response.use(
  response => {
    // 登录验证（未登录，跳转到登录页面）
    if (response.data.statusCode === 401) {
      const url = location.href
      // console.log(url) // http://localhost:3001/#/articalDetail?id=106
      location.hash = '#/login?redirect=' + url
    }
    return response
  },
  error => Promise.reject(error)
)
export default axios
