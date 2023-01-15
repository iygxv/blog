<script setup>
import { ref, onUnmounted } from 'vue'
import dictums from './utils'
// 打字文本
const dictumInfo = ref('')
const timer = ref(null)
const watingTyped = ref(false)
const backTimer = ref(null)


async function startPlay() {
  const newDictums = dictums.value.flat()
  const tasks = newDictums.map(dictum => {
    return createTask(async resolve => {
      let i = 0
      timer.value = setInterval(async () => {
        dictumInfo.value = dictum.substring(0, i + 1)
        i++
        if (i >= dictum.length) {
          if (timer.value) {
            clearInterval(timer.value)
            watingTyped.value = true
            await sleep(800)
            watingTyped.value = false
            backTimer.value = setInterval(async () => {
              dictumInfo.value = dictum.substring(0, i)
              i--
              if (i < 0) {
                watingTyped.value = true
                await sleep(200)
                watingTyped.value = false
                resolve()
                if (backTimer.value) clearInterval(backTimer.value)
              }
            }, 100)
          }
        }
      }, 250)
    })
  })
  await tasks.reduce((pre, next) => pre.then(ret => next(ret)), Promise.resolve())
  startPlay()
}

function createTask(cb) {
  return () =>
    new Promise(resolve => {
      cb(resolve)
    })
}

function sleep(delay = 500) {
  return new Promise(resolve => {
    setTimeout(resolve, delay)
  })
}

onUnmounted(() => {
  backTimer.value = null
})

startPlay()
</script>
<template>
  <div class="content-page">
    <span>{{ dictumInfo }}<span class="home-main-typed-cursor" :class="{ 'is-typed-cursor-anmation': watingTyped }">|</span></span>
  </div>
</template>
<style lang="scss" scoped>
.content-page {
  font-size: 24px;
  height: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  line-height: 40px;
}
.home-main-typed-cursor {
  margin-left: 4px;
  font-size: 28px;
}
.is-typed-cursor-anmation {
  animation: typed 0.5s ease infinite alternate;
}
</style>
