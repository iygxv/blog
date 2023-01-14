import { getCurItems } from `../../../utils`
const commonPath = `/article/about`
const booksDate = getCurItems(`${commonPath}/plan`, true, false)
const items = booksDate.map(item => ({
  text: item,
  link: `${commonPath}/${item}.md`
}))
export default [
  {
    text: `我的计划`,
    collapsible: true,
    collapsed: false,
    items
  },
]
