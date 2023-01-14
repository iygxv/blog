import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/leetcode`;
const leetcodeBase = getCurItems(`${commonPath}/base`);
const leetcodeSummary = getCurItems(`${commonPath}/summary`);

// leetcode item
const leetcodeBaseItems = leetcodeBase.map(item => ({
    text: item, link: `${commonPath}/base/${item}.md`
}))
const leetcodeSummaryItems = leetcodeSummary.map(item => ({
    text: item, link: `${commonPath}/summary/${item}.md`
}))


// 各系列
const webItems = [leetcodeBaseItems,leetcodeSummaryItems]
// 名字
const webSeries = [`leetcode类型`,`leetcode类型总结`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web