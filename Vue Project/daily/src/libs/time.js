const Time = {
  getUnix: function () {
    return (new Date()).getTime()
  },
  getTodayUnix: function () {
    let date = new Date()
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getYearUnix: function () {
    let date = new Date()
    date.setMonth(0)
    date.setDate(1)
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
    date.setMilliseconds(0)
    return date.getTime()
  },
  getLastDate: function (time) {
    let date = new Date(time)
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return date.getFullYear() + '-' + month + '-' + day
  },
  getFormatTime: function (timestamp) {
    let now = this.getUnix()
    let today = this.getTodayUnix()
    // let year = this.getYearUnix()
    let timer = (now - timestamp) / 1000
    let tip = ''

    if (timer <= 0) {
      tip = '刚刚'
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前'
    } else if (timer >= 3600 && (timestamp - today >= 0)) {
      tip = Math.floor(timer / 3600) + '小时前'
    } else if (timer / 86400 < 31) {
      tip = Math.ceil(timer / 86400) + '天前'
    } else {
      tip = this.getLastDate(timestamp)
    }
    return tip
  }
}
export default {
  bind: function (el, binding) {
    el.innerHtml = Time.getFormatTime(binding.value * 1000)
    el.__timeout__ = setInterval(function () {
      el.innerHtml = Time.getFormatTime(binding.value * 1000)
    }, 6000)
  },
  unbind: function (el) {
    clearInterval(el.__timeout__)
    delete el.__timeout__
  }
}
