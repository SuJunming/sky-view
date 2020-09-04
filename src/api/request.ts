import axios from 'axios'
import NProgress from 'nprogress'
import { message as mes } from 'antd'
axios.defaults.withCredentials = true
axios.defaults.timeout = 100000
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
const ENV_INFO: any = process.env.ENV_INFO
const origin = ENV_INFO.BASEURL || window.origin || window.location.origin
axios.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    NProgress.start()
    return config
  },
  (error) => Promise.reject(error),
)
const codeError: any = {
  '-1': '未知错误！',
  404: '服务未找到！',
  500: '服务器错误，请稍后重试！',
  504: '超时',
  403: '无权限',
}
const errorHandler = (res: any) => {
  const response = res.response || res
  const data = response.data
  let code = -1
  console.log(response)
  let message = (data && data.message) || codeError[code]
  NProgress.done()
  if (response.status === 401) {
    return Promise.reject({
      code: 401,
      message: '登录权限失效，请重新登录!',
      data,
    })
  }
  if (!data.code || data.code !== 200) {
    mes.error(message)
  }
  return Promise.reject({ code, message, data })
}
const successHandler = (response: any) => {
  NProgress.done()
  if (response.status === 200) {
    return response.data
  } else {
    return errorHandler(response)
  }
}
axios.interceptors.response.use(successHandler, errorHandler)
const request = {
  post(url: string, data?: any) {
    return axios({
      method: 'post',
      url: origin + url,
      data,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  get(url: string, params?: any) {
    return axios({
      method: 'get',
      url: origin + url,
      params,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  delete(url: string, params?: any) {
    return axios.delete(origin + url, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
  put(url: string, params?: any) {
    return axios.put(origin + url, params, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
  },
}
export { axios, request }
