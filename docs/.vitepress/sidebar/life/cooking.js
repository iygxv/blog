import { getCurItems } from `../../../utils`
const commonPath = `/article/life`
const booksData = getCurItems(`${commonPath}/cooking`, true, false)
const items = booksData.map(item => ({
  text: item,
  link: `${commonPath}/cooking/${item}.md`
}))
export default [
  {
    text: `TypeScript`,
    collapsible: true,
    collapsed: false,
    items
  },
]
