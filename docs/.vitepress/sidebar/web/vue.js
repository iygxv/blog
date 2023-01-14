import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web`;

const vue2 = getCurItems(`${commonPath}/vue/vue2`);
const vue3 = getCurItems(`${commonPath}/vue/vue3`);
const vue3SourceCode = getCurItems(`${commonPath}/vue/vue3/source-code`);
// vue
const vue2BaseItems = vue2.map(item => ({
    text: item, link: `${commonPath}/vue/vue2/${item}.md`
}))
const vue3BaseItems = vue3.map(item => ({
    text: item, link: `${commonPath}/vue/vue3/${item}.md`
}))
const vue3SourceCodeItems = vue3SourceCode.map(item => ({
    text: item, link: `${commonPath}/vue/vue3/source-code/${item}.md`
}))

// 各系列
const webItems = [vue2BaseItems,vue3BaseItems, vue3SourceCodeItems]
// 名字
const webSeries = [`Vue2`, `Vue3`, `Vue3源码解析`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web