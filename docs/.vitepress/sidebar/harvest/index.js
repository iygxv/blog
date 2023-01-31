import { getCurItems } from `../../../utils`
const commonPath = `/article/harvest`
const booksDate = getCurItems(`${commonPath}/i-know`, true, false)
const studyNotesDate = getCurItems(`${commonPath}/study-notes`, true, false)
const studyDifficultyDate = getCurItems(`${commonPath}/difficulty`, true, false)
const gitDate = getCurItems(`${commonPath}/git`, true, false)
const linkDate = getCurItems(`${commonPath}/link`, true, false)

const items = booksDate.map(item => ({
  text: item,
  link: `${commonPath}/i-know/${item}.md`
}))
const studyNotesItems = studyNotesDate.map(item => ({
  text: item,
  link: `${commonPath}/study-notes/${item}.md`
}))
const studyDifficultyItems = studyDifficultyDate.map(item => ({
  text: item,
  link: `${commonPath}/difficulty/${item}.md`
}))
const gitItems = gitDate.map(item => ({
  text: item,
  link: `${commonPath}/git/${item}.md`
}))
const linkItems = linkDate.map(item => ({
  text: item,
  link: `${commonPath}/link/${item}.md`
}))
export default [
  {
    text: `文章收集`,
    collapsible: true,
    collapsed: false,
    items: linkItems
  },
  {
    text: `杂七杂八`,
    collapsible: true,
    collapsed: false,
    items
  },
  {
    text: `git操作相关`,
    collapsible: true,
    collapsed: false,
    items: gitItems
  },
  {
    text: `网络知识`,
    collapsible: true,
    collapsed: false,
    items: studyNotesItems
  },
  {
    text: `cli相关`,
    collapsible: true,
    collapsed: false,
    items: studyDifficultyItems
  }
]
