import { getCurItems } from '../../utils'
const commonPath = '/article/interview';
const interviewDate = getCurItems('interview/series');
const interviewEveryDate = getCurItems('interview/every2');
const items = interviewDate.map(item => ({
    text: item, link: `${commonPath}/series/${item}.md`
}))
const everyItems2 = interviewEveryDate.map(item => ({
    text: item, link: `${commonPath}/every2/${item}.md`
}))


export default [
    {
        text: '每日一题',
        collapsible: true,
        collapsed: false,
        items: everyItems2
    },
    {
        text: '面试',
        collapsible: true,
        collapsed: false,
        items
    }
]