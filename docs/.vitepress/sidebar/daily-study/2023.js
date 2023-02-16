import { getCurItems } from `../../../utils`
const commonPath = `/article/daily-study/2023`
const JanuaryDate = getCurItems(`${commonPath}/January`, true)
const FebruaryDate = getCurItems(`${commonPath}/February`, true)

const itemsJanuary = JanuaryDate.map(item => ({
  text: item,
  link: `${commonPath}/January/${item}.md`
}))
const itemsFebruary = FebruaryDate.map(item => ({
  text: item,
  link: `${commonPath}/February/${item}.md`
}))

export default [
  {
    text: `一月`,
    collapsible: true,
    collapsed: true,
    items: itemsJanuary
  },
  {
    text: `二月`,
    collapsible: true,
    collapsed: false,
    items: itemsFebruary
  },
]
