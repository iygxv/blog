import { getCurItems } from `../../../utils`
const commonPath = `/article/read`
const booksDate = getCurItems(`${commonPath}`, true, false)
const items = booksDate.map(item => ({
  text: item,
  link: `${commonPath}/${item}.md`
}))
export default [
  {
    text: `读书收获`,
    collapsible: true,
    collapsed: false,
    items
  },
]
