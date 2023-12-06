import { getCurItems } from `../../../utils`


const commonPath = `/article/harvest`
const booksData = getCurItems(`${commonPath}/i-know`, true, false)
const studyNotesData = getCurItems(`${commonPath}/study-notes`, true, false)
const studyDifficultyData = getCurItems(`${commonPath}/difficulty`, true, false)
const gitData = getCurItems(`${commonPath}/git`, true, false)
const linkData = getCurItems(`${commonPath}/link`, true, false)

const items = booksData.map(item => ({
  text: item,
  link: `${commonPath}/i-know/${item}.md`
}))
const studyNotesItems = studyNotesData.map(item => ({
  text: item,
  link: `${commonPath}/study-notes/${item}.md`
}))
const studyDifficultyItems = studyDifficultyData.map(item => ({
  text: item,
  link: `${commonPath}/difficulty/${item}.md`
}))
const gitItems = gitData.map(item => ({
  text: item,
  link: `${commonPath}/git/${item}.md`
}))
const linkItems = linkData.map(item => ({
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
