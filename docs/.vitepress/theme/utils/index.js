import { ref } from 'vue'
const earlyMorning = ref([
  [
    '愿你做一个明亮的人，不熬夜，早睡早起。',
    '当你决定坚持一件事情，全世界都会为你让路。早安！',
    '成功的路上从来不堵车。想过自律的人生，就请从早起开始吧。早安！',
    '我不主动找你，不是你不重要了，而是我知道我不重要了。早安！',
    '睡去昨日的疲惫，忘却昨日的烦恼，睁开这天的双眼，打开这天的完美',
   ]
])

const exercise = ref([
  [
    '多一份运动、多一份健康、多一份快乐。',
  ]
])

const write = ref([
  [
    '写作是一条认识自己，认识真理的路，你只要喜欢写，应该随时动笔去写。'
  ]
])

const muse = ref([
  [
    '冥想是一个分心和集中的反复过程，它会使你心平气和',
  ]
])

const read = ref([
  [
    '阅读永远是获取知识面最为廉价的方法，没有之一！'
  ]
])

// const dictums = {
//   1: earlyMorning,
//   2: exercise,
//   3: write,
//   4: muse,
//   5: read
// }

// const randomNum = Math.floor(1 + Math.random() * 5)

// export default dictums[randomNum]

const dictums = ref([
  // ['如何做一个很哇塞的人的人呢?']
  ['坏习惯养成也太容易了吧，好习惯养成也很难！难的是自己容易被外界影响，很小的东西都能影响到我']
  // ['不管你在外面经历了什么，天黑了，我带你回家。'],
  // ['无人问津也好，技不如人也罢，你都要试着安静下来去做自己该做的事，而不是让内心的烦躁、焦虑、毁掉你本就不多的热情和定力']
])

export default dictums