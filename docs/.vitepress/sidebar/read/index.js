import { getCurItems } from `../../../utils`
const commonPath = `/article/read`
const booksData = getCurItems(`${commonPath}`, true, false)
const items = booksData.map(item => ({
  text: item,
  link: `${commonPath}/${item}.md`
}))
export default [
  {
    text: `技术书`,
    collapsible: true,
    collapsed: false,
    items
  },
]
