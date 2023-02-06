import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web/engineered`;

const vite = getCurItems(`${commonPath}/vite`);
//webpack
const viteItems = vite.map(item => ({
    text: item, link: `${commonPath}/vite/${item}.md`
}))


// 各系列
const webItems = [viteItems]
// 名字
const webSeries = [`vite`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web