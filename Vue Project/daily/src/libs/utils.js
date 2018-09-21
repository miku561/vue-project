import axios from 'axios'

//  基本配置
const Util = {
  // imgPath: 'http://47.96.101.254:8011/img/',
  apiPath: 'http://47.96.101.254:8081/'
}

// Ajax 通用配置
Util.ajax = axios.create({
  baseURL: Util.apiPath
})

// 添加响应拦截器
Util.ajax.interceptors.response.use(res => {
  return res.data
})

// 获取今天的时间戳
Util.getTodayTime = function () {
  const date = new Date()
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  date.setMilliseconds(0)
  return date.getTime()
}

// 获取前一天的日期
Util.prevDay = function (timestamp = (new Date()).getTime()) {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const day = date.getDate() < 10 ? ' 0' + date.getDate() : date.getDate()
  return year + month + day
}

//  间隔时间格式化
// Util.time = {
//   getUnix: function () {
//     return (new Date()).getTime()
//   },
//   getTodayUnix: function () {
//     let date = new Date()
//     date.setHours(0)
//     date.setMinutes(0)
//     date.setSeconds(0)
//     date.setMilliseconds(0)
//     return date.getTime()
//   },
//   getYearUnix: function () {
//     let date = new Date()
//     date.setMonth(0)
//     date.setDate(1)
//     date.setHours(0)
//     date.setMinutes(0)
//     date.setSeconds(0)
//     date.setMilliseconds(0)
//     return date.getTime()
//   },
//   getLastDate: function (time) {
//     let date = new Date(time)
//     let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
//     let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
//     return date.getFullYear() + '-' + month + '-' + day
//   },
//   getFormatTime: function (timestamp) {
//     let now = this.getUnix()
//     let today = this.getTodayUnix()
//     let year = this.getYearUnix()
//     let timer = (now - timestamp) / 1000
//     let tip = ''

//     if (timer <= 0) {
//       tip = '刚刚'
//     } else if (Math.floor(timer / 60) <= 0) {
//       tip = '刚刚'
//     } else if (timer < 3600) {
//       tip = Math.floor(timer / 60) + '分钟前'
//     } else if (timer >= 3600 && (timestamp - today >= 0)) {
//       tip = Math.floor(timer / 3600) + '小时前'
//     } else if (timer / 86400 < 31) {
//       tip = Math.ceil(timer / 86400) + '天前'
//     } else {
//       tip = this.getLastDate(timestamp)
//     }
//     return tip
//   }
// }

export default Util
