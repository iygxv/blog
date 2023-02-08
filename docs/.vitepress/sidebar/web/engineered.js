import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web/engineered`;

const vite = getCurItems(`${commonPath}/vite`);
const relevant = getCurItems(`${commonPath}/relevant`);
//webpack
const viteItems = vite.map(item => ({
    text: item, link: `${commonPath}/vite/${item}.md`
}))
const relevantItems = relevant.map(item => ({
    text: item, link: `${commonPath}/relevant/${item}.md`
}))


// 各系列
const webItems = [relevantItems, viteItems]
// 名字
const webSeries = [`webpack、rollup、vite相关`,`vite`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web