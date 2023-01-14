import { getCurItems } from `../../../utils`
const commonPath = `/article/web`
const booksDate = getCurItems(`${commonPath}/ts`, true, false)
const items = booksDate.map(item => ({
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
