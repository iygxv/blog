import { getCurItems } from `../../../utils`
// 共同路径
const commonPath = `/article/web`;

const webpack = getCurItems(`${commonPath}/webpack`);
//webpack
const webpackBaseItems = webpack.map(item => ({
    text: item, link: `${commonPath}/webpack/${item}.md`
}))


// 各系列
const webItems = [webpackBaseItems]
// 名字
const webSeries = [`Webpack基础`]

const web =  webSeries.map((item, index) => ({
    text: item,
    collapsible: true,
    collapsed: false,
    items : webItems[index]
}))

export default web