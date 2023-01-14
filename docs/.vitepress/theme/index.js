import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import './style/custom.scss'
import Content from './Content.vue'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'home-features-after': () => h(Content)
    })
  }
  // enhanceApp({ app }) {
  //   app.use()
  // }
}
