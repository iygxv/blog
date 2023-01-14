import { getCurItems } from `../../../utils`
const commonPath = `/article/interview`;
const interviewDate = getCurItems(`${commonPath}/series`);
const items = interviewDate.map(item => ({
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