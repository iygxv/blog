import { getCurItems } from `../../../utils`
const commonPath = `/article/daily-study/2023`
const JanuaryData = getCurItems(`${commonPath}/January`, true)
const FebruaryData = getCurItems(`${commonPath}/February`, true)
const MarchData = getCurItems(`${commonPath}/March`, true)

const itemsJanuary = JanuaryData.map(item => ({
  text: item,
  link: `${commonPath}/January/${item}.md`
}))
const itemsFebruary = FebruaryData.map(item => ({
  text: item,
  link: `${commonPath}/February/${item}.md`
}))
const itemsMarch = MarchData.map(item => ({
  text: item,
  link: `${commonPath}/March/${item}.md`
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
  {
    text: `三月`,
    collapsible: true,
    collapsed: false,
    items: itemsMarch
  },
]
