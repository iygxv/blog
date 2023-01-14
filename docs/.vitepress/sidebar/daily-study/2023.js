import { getCurItems } from `../../../utils`
const commonPath = `/article/daily-study/2023`
const JanuaryDate = getCurItems(`${commonPath}/January`)

const itemsJanuary = JanuaryDate.map(item => ({
  text: item,
  link: `${commonPath}/January/${item}.md`
}))

export default [
  {
    text: `1月`,
    collapsible: true,
    collapsed: false,
    items: itemsJanuary
  },
]
