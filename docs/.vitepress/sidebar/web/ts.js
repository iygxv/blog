import { getCurItems } from '../../../utils'
const commonPath = '/article/web/ts'
const booksDate = getCurItems('web/ts', true, false)
const items = booksDate.map(item => ({
  text: item,
  link: `${commonPath}/${item}.md`
}))
export default [
  {
    text: `TypeScript`,
    collapsible: true,
    collapsed: false,
    items
  },
]
