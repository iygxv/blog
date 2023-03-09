import { getCurItems } from `../../../utils`
const commonPath = `/article/web`
const booksData = getCurItems(`${commonPath}/ts`, true, false)
const items = booksData.map(item => ({
  text: item,
  link: `${commonPath}/ts/${item}.md`
}))
export default [
  {
    text: `TypeScript`,
    collapsible: true,
    collapsed: false,
    items
  },
]
