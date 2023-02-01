import { getCurItems } from `../../../utils`
const commonPath = `/article/daily-study/2022`
const dailyStudyDate = getCurItems(`${commonPath}/july`, false, true)
const dailyStudyAugustDate = getCurItems(`${commonPath}/august`, false, true)
const dailyStudySeptemberDate = getCurItems(`${commonPath}/september`, false, true)
const dailyStudyOctoberDate = getCurItems(`${commonPath}/October`)
const dailyStudyNovemberDate = getCurItems(`${commonPath}/November`)


const items = dailyStudyDate.map(item => ({
  text: item,
  link: `${commonPath}/july/${item}.md`
}))
const itemAugust = dailyStudyAugustDate.map(item => ({
  text: item,
  link: `${commonPath}/august/${item}.md`
}))
const itemSeptember = dailyStudySeptemberDate.map(item => ({
  text: item,
  link: `${commonPath}/september/${item}.md`
}))
const itemOctober = dailyStudyOctoberDate.map(item => ({
  text: item,
  link: `${commonPath}/October/${item}.md`
}))
const itemNovember = dailyStudyNovemberDate.map(item => ({
  text: item,
  link: `${commonPath}/November/${item}.md`
}))

export default [
  {
    text: `七月手写 (${dailyStudyDate.length})`,
    collapsible: true,
    collapsed: true,
    items
  },
  {
    text: `八月手写 (${dailyStudyAugustDate.length})`,
    collapsible: true,
    collapsed: true,
    items: itemAugust,
  },
  {
    text: `九月http系列 (${dailyStudySeptemberDate.length})`,
    collapsible: true,
    collapsed: true,
    items: itemSeptember,
  },
  {
    text: `十月性能与监控系列 (${dailyStudyOctoberDate.length})`,
    collapsible: true,
    collapsed: false,
    items: itemOctober,
  },
  {
    text: `十一月规划的变更`,
    collapsible: true,
    collapsed: false,
    items: itemNovember,
  }
]
