import Vue from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

//初始化中文语言包
import 'dayjs/locale/zh-cn'

// 全局使用中文语言包
dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

Vue.filter('relativeTime', (value) => {
  return dayjs(value).from(dayjs())
})

Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm') => {
  return dayjs(value).format(format)
})
