const fs = require('fs')
const path = require('path')

/**
 * 版本号排序
 * @param {*} version 版本号
 * @param {*} mode 模式(从小到大)
 * @returns 排序号的版本号
 */
const versionSort = (version, mode = 'fs') => {
  version.sort((a, b) => {
    let i = 0
    const aVersion = a.split('-')[0].split('.')
    const bVersion = b.split('-')[0].split('.')
    while (true) {
      const aVersionItem = aVersion[i]
      const bVersionItem = bVersion[i]
      i++
      // 例如遇到比较4.3.5', '4.3.5.5'
      if (bVersionItem == undefined || aVersionItem == undefined) {
        if(mode === 'fb') {
          return aVersion.length - bVersion.length
        }else {
          return bVersion.length - aVersion.length
        }
      }
      // 如果当前相等, 需要进行下一轮比较
      if (aVersionItem === bVersionItem) continue
      // 比较版本数字
      if(mode === 'fs') {
        return aVersionItem.length - bVersionItem.length
      }else {
        return bVersionItem.length - aVersionItem.length
      }
    }
  })
  return version
}
/**
 * 基本排序
 * @param {*} items 排序的数组
 * @returns 排序好的数组
 */
const baseSort = (items) => {
  return items.sort((a, b) => Number(a.split('-')[0]) - Number(b.split('-')[0]))
}
/**
 * 侧边栏自动添加
 * @param {*} _path 路径
 * @param {*} isSort 是否排序
 * @param {*} isEvery 是否每日一题
 * @param {*} items 
 * @returns 
 */
export const getCurItems = (_path, isSort = false, isEvery = false, items = [],) => {
  // path === 'web/webpack'
  const mdPath = path.resolve(process.cwd(), 'docs', _path.slice(1))
  fs.readdirSync(mdPath).forEach(file => {
    if (file === 'index.md' || !file.includes('md')) {
      return
    } else {
      items.push(file.split('.md')[0])
    }
  })
  // 处理每日一题
  if (isEvery) {
    return versionSort(items)
  }
  if(isSort) {
    return baseSort(items)
  }
  return items
}
/**
 * 格式化日期
 * @param   {Date}    date  日期
 * @param   {String}  fmt   日期格式(yyyy-MM-dd hh:mm:ss)
 * @return  {String}        格式化结果
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!date || typeof date === 'string') {
    return ''
  }
  typeof date === 'number' && (date = new Date(date))
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}
