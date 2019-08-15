// 引入封装的ajax
import ajax from '@/util/request'

export const getContentList = (params?: object) => ajax({ url: 'res/site/content/list', params })