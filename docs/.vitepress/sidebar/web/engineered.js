import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web/engineered`;

const vite = getCurItems(`${commonPath}/vite`);
const webpack = getCurItems(`${commonPath}/webpack`);
const relevant = getCurItems(`${commonPath}/relevant`);

const viteItems = vite.map(item => ({
    text: item, link: `${commonPath}/vite/${item}.md`
}))
const webpackItems = webpack.map(item => ({
    text: item, link: `${commonPath}/webpack/${item}.md`
}))
const relevantItems = relevant.map(item => ({
    text: item, link: `${commonPath}/relevant/${item}.md`
}))


// 各系列
const webItems = [relevantItems, webpackItems, viteItems]
// 名字
const webSeries = [`webpack、rollup、vite相关`, `webpack` ,`vite`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web