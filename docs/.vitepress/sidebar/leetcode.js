import { getCurItems } from '../../utils'
const leetcodeBase = getCurItems('leetcode/base');
const leetcodeSummary = getCurItems('leetcode/summary');



// 共同路径
const commonPath = '/article';
// leetcode item
const leetcodeBaseItems = leetcodeBase.map(item => ({
    text: item, link: `${commonPath}/leetcode/base/${item}.md`
}))
const leetcodeSummaryItems = leetcodeSummary.map(item => ({
    text: item, link: `${commonPath}/leetcode/summary/${item}.md`
}))


// 各系列
const webItems = [leetcodeBaseItems,leetcodeSummaryItems]
// 名字
const webSeries = ['leetcode类型','leetcode类型总结']

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web