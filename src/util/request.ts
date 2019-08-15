import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import CONFIG from '@/util/config';
axios.defaults.baseURL = CONFIG.url
axios.defaults.timeout = 10000;

// 添加请求拦截器
let defaultParams: any = {
  token: 'd8c4d34e005e46e1b8256f2ba363e137'
}
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (config.method === 'post') {
    config.data = Object.assign(defaultParams, config.data)
  } else {
    config.params = Object.assign(defaultParams, config.params)
  }
  return config
})

/**
 * 封装请求
 * @param config 
 */
const ajax = (config: object): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    axios(config).then((res: any) => {
      resolve(res.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default ajax


