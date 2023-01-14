import { getCurItems } from '../../utils'
const commonPath = '/article/every-insist'
const everyInsistDate = getCurItems('every-insist/july', false, true)
const everyInsistAugustDate = getCurItems('every-insist/august', false, true)
const everyInsistSeptemberDate = getCurItems('every-insist/september', false, true)
const everyInsistOctoberDate = getCurItems('every-insist/October')
const everyInsistNovemberDate = getCurItems('every-insist/November')

const everyInsistHardDate = getCurItems('every-insist/hard', true)

const items = everyInsistDate.map(item => ({
  text: item,
  link: `${commonPath}/july/${item}.md`
}))
const itemAugust = everyInsistAugustDate.map(item => ({
  text: item,
  link: `${commonPath}/august/${item}.md`
}))
const itemSeptember = everyInsistSeptemberDate.map(item => ({
  text: item,
  link: `${commonPath}/september/${item}.md`
}))
const itemOctober = everyInsistOctoberDate.map(item => ({
  text: item,
  link: `${commonPath}/October/${item}.md`
}))
const itemNovember = everyInsistNovemberDate.map(item => ({
  text: item,
  link: `${commonPath}/November/${item}.md`
}))

const itemHards = everyInsistHardDate.map(item => ({
  text: item,
  link: `${commonPath}/hard/${item}.md`
}))
export default [
  {
    text: `七月手写 (${everyInsistDate.length})`,
    collapsible: true,
    collapsed: true,
    items
  },
  {
    text: `八月手写 (${everyInsistAugustDate.length})`,
    collapsible: true,
    collapsed: true,
    items: itemAugust,
  },
  {
    text: `九月http系列 (${everyInsistSeptemberDate.length})`,
    collapsible: true,
    collapsed: true,
    items: itemSeptember,
  },
  {
    text: `十月性能与监控系列 (${everyInsistOctoberDate.length})`,
    collapsible: true,
    collapsed: false,
    items: itemOctober,
  },
  {
    text: `十一月规划的变更`,
    collapsible: true,
    collapsed: false,
    items: itemNovember,
  },
  {
    text: '手写(难)',
    collapsible: true,
    collapsed: true,
    items: itemHards,
  }
]
