# **与Vue2的差别**

- 响应式原理 pxoxy / defineProperty
- Vue3 diff算法（可以根据patchFlag做diff + 最长递增子序列） /  Vue2的区别（全量的diff）
- compositionApi（tree-sharking） / options Api
- Fragment 支持多个根节点 （Vue3）
- Vue3 ts  / Vue2 flow(类型判断不是很准确)
- 自定义渲染器 createRenderer() 传入自己的渲染方法， 好处就是我可以根据vue核心来实现不同平台的代码
- monorepo的代码管理方式（pnpm）
- 模版编译优化