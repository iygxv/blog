import { getCurItems } from `../../../utils`
const commonPath = `/article/daily-study/2022`
const dailyStudyData = getCurItems(`${commonPath}/july`, false, true)
const dailyStudyAugustData = getCurItems(`${commonPath}/august`, false, true)
const dailyStudySeptemberData = getCurItems(`${commonPath}/september`, false, true)
const dailyStudyOctoberData = getCurItems(`${commonPath}/October`)
const dailyStudyNovemberData = getCurItems(`${commonPath}/November`)


const items = dailyStudyData.map(item => ({
  text: item,
  link: `${commonPath}/july/${item}.md`
}))
const itemAugust = dailyStudyAugustData.map(item => ({
  text: item,
  link: `${commonPath}/august/${item}.md`
}))
const itemSeptember = dailyStudySeptemberData.map(item => ({
  text: item,
  link: `${commonPath}/september/${item}.md`
}))
const itemOctober = dailyStudyOctoberData.map(item => ({
  text: item,
  link: `${commonPath}/October/${item}.md`
}))
const itemNovember = dailyStudyNovemberData.map(item => ({
  text: item,
  link: `${commonPath}/November/${item}.md`
}))

export default [
  {
    text: `七月手写 (${dailyStudyData.length})`,
    collapsible: true,
    collapsed: false,
    items
  },
  {
    text: `八月手写 (${dailyStudyAugustData.length})`,
    collapsible: true,
    collapsed: true,
    items: itemAugust,
  },
  {
    text: `九月http系列 (${dailyStudySeptemberData.length})`,
    collapsible: true,
    collapsed: true,
    items: itemSeptember,
  },
  {
    text: `十月性能与监控系列 (${dailyStudyOctoberData.length})`,
    collapsible: true,
    collapsed: true,
    items: itemOctober,
  },
  {
    text: `十一月规划的变更`,
    collapsible: true,
    collapsed: true,
    items: itemNovember,
  }
]
