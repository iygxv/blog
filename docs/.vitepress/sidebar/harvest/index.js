import { getCurItems } from `../../../utils`
const commonPath = `/article/harvest`
const booksDate = getCurItems(`${commonPath}/i-know`, true, false)
const studyNotesDate = getCurItems(`${commonPath}/study-notes`, true, false)
const studyDifficultyDate = getCurItems(`${commonPath}/difficulty`, true, false)

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
export default [
  {
    text: `文章`,
    collapsible: true,
    collapsed: false,
    items
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
