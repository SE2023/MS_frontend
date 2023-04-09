/**
 * Independent time operation tool to facilitate subsequent switch to dayjs
 */
import dayjs from 'dayjs'

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format)
}

// 中国标准时间 转换成 年月日
export function timestampToTime(time) {
  const date = new Date(time)
  const y = date.getFullYear()
  let m: string | number = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d: string | number = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + m + '-' + d
}

// 中国标准时间 转换成 时分秒
export function timestampToTime2(time) {
  const date = new Date(time)
  let h: string | number = date.getHours()
  h = h < 10 ? '0' + h : h
  let m: string | number = date.getMinutes()
  m = m < 10 ? '0' + m : m
  let s: string | number = date.getSeconds()
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}

export const dateUtil = dayjs
