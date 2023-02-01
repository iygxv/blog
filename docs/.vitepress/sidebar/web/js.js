import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web`

const js = getCurItems(`${commonPath}/javascript/base`, true)
const jsSenior = getCurItems(`${commonPath}/javascript/senior`, true)
const jsEs6 = getCurItems(`${commonPath}/javascript/es6`, true)
const jsExamine = getCurItems(`${commonPath}/javascript/examine`, true)
// js
const jsBaseItems = js.map(item => ({
  text: item,
  link: `${commonPath}/javascript/base/${item}.md`
}))
const jsSeniorItems = jsSenior.map(item => ({
  text: item,
  link: `${commonPath}/javascript/senior/${item}.md`
}))
const jsEs6Items = jsEs6.map(item => ({
  text: item,
  link: `${commonPath}/javascript/es6/${item}.md`
}))
const jsExamineItems = jsExamine.map(item => ({
  text: item,
  link: `${commonPath}/javascript/examine/${item}.md`
}))
// 各系列
const webItems = [jsBaseItems, jsSeniorItems, jsEs6Items, jsExamineItems]
// 名字
const webSeries = [`Javascript基本`, `Javascript高级`, `ES6`, `JS能力检验`]

const web = webSeries.map((item, index) => ({
  text: item,
  collapsible: true,
  collapsed: true,
  items: webItems[index]
}))

export default web
