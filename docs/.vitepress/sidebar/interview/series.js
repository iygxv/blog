import { getCurItems } from `../../../utils`
const commonPath = `/article/interview`;
const interviewData = getCurItems(`${commonPath}/series`);
const items = interviewData.map(item => ({
    text: item, link: `${commonPath}/series/${item}.md`
}))

export default [
    {
        text: `面试`,
        collapsible: true,
        collapsed: false,
        items
    }
]