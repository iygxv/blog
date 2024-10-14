---
top: 1
sticky: 10000
sidebar:
  title: EveryT - 十月
  step: 5
  isTimeLine: true
title: EveryT - 十月
tags:
  - 笔记
categories:
  - 笔记
---

# EveryT - 十月

## :nth-of-type 和:nth-child（2024-10-14）

- `:nth-child` 伪类根据元素在父元素的子元素列表中的索引来选择元素。换言之，:nth-child() 选择器根据父元素内的所有`兄弟元素`的位置来选择子元素。
- `:nth-of-type` CSS 伪类基于`相同类型（标签名称）的兄弟元素`中的位置来匹配元素。

### MDN

[:nth-child](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child)

[:nth-of-type](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type)

### 其他

- `:nth-last-child` 这个 CSS 伪类 从兄弟节点中从后往前匹配处于某些位置的元素
- `:nth-last-of-type` CSS 伪类基于元素在相同类型（标签名）的兄弟元素中相对最后一个元素的位置来匹配元素。

## 属性选择器（2024-10-13）

属性选择器是 CSS 中的一种选择器，允许你根据 HTML 元素的属性及其值来选择元素。这种选择器可以帮助开发者更精确地为元素应用样式，而无需依赖于类或 ID。属性选择器在 CSS2 中首次引入，并在 CSS3 中得到了扩展。以下是属性选择器的详细说明及示例：

### 属性选择器的类型

1. **存在属性选择器**

   - **语法**：`[attr]`

   - **描述**：选择具有指定属性的元素。

   - 示例：

     ```css
     /* 选择所有具有 "data-info" 属性的元素 */
     [data-info] {
         background-color: yellow;
     }
     ```

2. **相等值选择器**

   - **语法**：`[attr=value]`

   - **描述**：选择属性值等于指定值的元素。

   - 示例：

     ```css
     /* 选择所有具有 "type" 属性且值为 "text" 的输入框 */
     input[type="text"] {
         border: 2px solid blue;
     }
     ```

3. **包含词汇选择器**

   - **语法**：`[attr~=value]`

   - **描述**：选择属性值包含指定词汇的元素（词汇之间用空格分隔）。

   - 示例：

     ```css
     /* 选择所有 class 属性包含 "highlight" 的元素 */
     [class~="highlight"] {
         color: red;
     }
     ```

4. **前缀选择器**

   - **语法**：`[attr^=value]`

   - **描述**：选择属性值以指定值开头的元素。

   - 示例：

     ```css
     /* 选择所有 src 属性以 "https://" 开头的图像 */
     img[src^="https://"] {
         border: 1px solid green;
     }
     ```

5. **后缀选择器**

   - **语法**：`[attr$=value]`

   - **描述**：选择属性值以指定值结尾的元素。

   - 示例：

     ```css
     /* 选择所有 href 属性以 ".pdf" 结尾的链接 */
     a[href$=".pdf"] {
         font-weight: bold;
     }
     ```

6. **前缀和连字符选择器**

   - **语法**：`[attr|=value]`

   - **描述**：选择属性值以指定值开头的元素，后面可以跟一个连字符（例如，`"en"` 和 `"en-US"`）。

   - 示例：

     ```css
     /* 选择所有 lang 属性为 "en" 或 "en-US" 的元素 */
     [lang|="en"] {
         background-color: lightblue;
     }
     ```

### 示例总结

属性选择器可以非常灵活地选择元素，以下是一个综合示例：

```html
<a href="https://example.com" target="_blank" class="external">External Link</a>
<a href="https://example.com/file.pdf" class="document">PDF Document</a>
<input type="text" placeholder="Enter your name">
<input type="button" value="Click Me">
```

```css
/* 选择所有有 target 属性的链接 */
a[target] {
    color: green;
}

/* 选择所有 href 属性以 ".pdf" 结尾的链接 */
a[href$=".pdf"] {
    text-decoration: underline;
}

/* 选择所有 class 包含 "external" 的链接 */
a[class~="external"] {
    font-weight: bold;
}

/* 选择所有类型为 "text" 的输入框 */
input[type="text"] {
    border: 1px solid blue;
}
```

通过使用属性选择器，开发者可以针对特定属性进行样式控制，提高了 CSS 的灵活性和可维护性。

## CSS3 新增属性有什么？（2024-10-12）

### 1. **选择器增强**

- 属性选择器：
  - `[attr]`：选择具有指定属性的元素。
  - `[attr=value]`：选择属性值等于指定值的元素。
  - `[attr~=value]`：选择属性值包含指定词汇（以空格分隔）的元素。
  - `[attr|=value]`：选择属性值以指定值开头的元素，后面可跟一个连字符（例如，`"en"` 和 `"en-US"`）。
  - `[attr^=value]`：选择属性值以指定值开头的元素。
  - `[attr$=value]`：选择属性值以指定值结尾的元素。
- 伪类选择器：
  - `:nth-child(n)`：选择第 n 个子元素。
  - `:nth-of-type(n)`：选择特定类型的第 n 个子元素。
  - `:not(selector)`：选择不匹配指定选择器的元素。

### 2. **盒模型**

- **border-radius**：实现圆角边框。
- **box-shadow**：为元素添加阴影效果。
- **text-shadow**：为文本添加阴影效果。

### 3. **背景与渐变**

- **background-size**：定义背景图像的大小。
- **background-clip**：指定背景的裁切区域。
- **linear-gradient()**、**radial-gradient()**：用于创建线性和径向渐变背景。

### 4. **弹性布局**

- **display: flex**：启用弹性布局。
- **flex-direction**、**justify-content**、**align-items** 等属性，用于控制弹性盒的排列和布局。

### 5. **网格布局**

- **display: grid**：启用网格布局。
- **grid-template-columns**、**grid-template-rows**、**grid-area** 等属性，用于定义网格的结构和布局。

### 6. **过渡与动画**

- **transition**：定义属性变化的过渡效果（如 `transition: all 0.3s ease;`）。
- **@keyframes**：定义动画的关键帧。
- **animation**：应用动画效果（如 `animation: my-animation 2s infinite;`）。

### 7. **变换**

- **transform**：用于进行旋转、缩放、倾斜和平移等变换（如 `transform: rotate(45deg);`）。

### 8. **多列布局**

- **column-count**：定义列的数量。
- **column-gap**：定义列之间的间隙。
- **column-rule**：定义列之间的分隔线。

### 9. **媒体查询**

- 允许基于设备特性（如屏幕宽度）应用不同的样式，支持响应式设计。例如：

  ```css
  @media (max-width: 600px) {
      body {
          background-color: lightblue;
      }
  }
  ```

### 10. **自定义属性（CSS 变量）**

- 可以使用自定义属性定义 CSS 变量，例如：

  ```css
  :root {
      --main-color: #3498db;
  }
  .element {
      color: var(--main-color);
  }
  ```

### 11. **其他新功能**

- **opacity**：设置元素的不透明度。
- **filter**：为元素应用图像效果（如模糊、灰度等）。
- **clip-path**：定义元素的可视区域，允许创建复杂的形状。

## 列出文件目录的树形结构（2024-10-11）

在 Mac 和 Windows 系统中，都可以使用`tree`命令来列出项目文件的树形结构。以下是两个系统中`tree`命令的具体使用方法：

### Windows

在 Windows 中，`tree`是一个内置的命令行工具，用于以树状结构显示指定路径下的目录和文件。

1. **基本用法**：
   - 显示当前目录及其子目录结构：在命令行中输入`tree`（不带任何参数）即可。
   - 显示指定路径下的目录结构：例如，`tree C:\Users\YourName\Documents`将显示`C:\Users\YourName\Documents`目录及其子目录的结构。
2. **高级功能**：
   - 显示每个文件夹中文件的名称：使用`/F`参数。例如，`tree /F`将显示当前目录及其子目录中的所有文件和文件夹。
   - 使用 ASCII 字符来绘制树状结构：使用`/A`参数。例如，`tree /A`将以 ASCII 字符形式显示树状结构。
   - 将输出保存到文件：使用重定向符（`>`）。例如，`tree /F > directory_structure.txt`将当前目录及其子目录的详细结构输出到`directory_structure.txt`文件中。

### Mac

在 Mac 中，`tree`命令不是内置的，但可以通过安装来获取。

1. **安装`tree`**：
   - 使用 Homebrew 进行安装：在终端中输入`brew install tree`。
2. **基本用法**：
   - 导航到项目目录：使用`cd`命令导航到要显示树形结构的项目目录。
   - 显示项目目录的树形结构：在终端中输入`tree`即可。
3. **高级功能**：
   - 显示指定层级的目录结构：使用`-L`参数。例如，`tree -L 2`将显示当前目录下的两层子目录结构。
   - 过滤不想显示的文件或文件夹：使用`-I`参数。例如，`tree -I 'node_modules|src'`将过滤掉`node_modules`和`src`文件夹。
   - 将输出保存到文件：使用重定向符（`>`）。例如，`tree > tree.txt`将项目结构输出到`tree.txt`文件中。

总之，无论是在 Windows 还是 Mac 系统中，`tree`命令都是一个非常实用的工具，可以帮助用户以树形结构直观地查看项目文件的层次结构。

## source-map 是什么？生成环境怎么用？（2024-10-10）

Source Map（源代码映射）是一个存储源代码与编译代码对应位置映射的信息文件。它记录了转换压缩后的代码所对应的转换前的源代码位置，是源代码和生产代码的映射。以下是关于 Source Map 的详细介绍：

### 一、Source Map 的作用

1. **方便调试**：Source Map 在开发和生产环境之间建立了桥梁，使开发人员能够在浏览器中查看、调试和分析原始代码，而不是压缩后的代码。这对于错误追踪、性能分析和调试非常有帮助。
2. **定位问题**：在生产环境中，代码经过压缩、混淆后，变得难以阅读和理解。Source Map 可以将压缩后的代码映射回原始代码，帮助开发人员快速定位问题发生的行列位置。

### 二、Source Map 的生成

在开发过程中，许多构建工具（如 Webpack、Rollup 和 Babel）都支持自动生成和处理 Source Map。只需要在配置文件中启用相关选项，工具就会在生成压缩文件的同时生成相应的 Source Map 文件。

### 三、生产环境中 Source Map 的使用

1. **配置构建工具**：在生产环境的构建配置中，需要启用 Source Map 的生成。以 Webpack 为例，可以在`devtool`选项中配置生成 Source Map 的方式。例如，使用`source-map`选项可以生成单独的 Source Map 文件，而`inline-source-map`选项则会将 Source Map 信息嵌入到输出文件中。但需要注意的是，`inline-source-map`会增大输出文件的体积，通常只适用于开发环境。
2. **保护源代码**：虽然 Source Map 有助于调试，但它也可能泄露源代码信息。因此，在生产环境中，应确保不将 Source Map 文件公开暴露。可以通过将 Source Map 文件仅上传到错误跟踪服务，或在服务器上配置访问权限，以防止未经授权的访问。
3. **使用 Source Map 定位错误**：当生产环境中的代码出现问题时，可以使用浏览器的开发者工具加载 Source Map 文件，以便在调试过程中查看原始的、未压缩的代码。这有助于快速定位问题所在，并进行修复。

### 四、Source Map 的注意事项

1. **性能考虑**：虽然 Source Map 有助于调试，但它也可能对性能产生影响。因此，在生产环境中，应根据实际需求权衡是否使用 Source Map。
2. **版本管理**：随着项目的迭代和更新，源代码和生成的 Source Map 文件也会发生变化。因此，需要做好版本管理工作，以便在需要时能够回溯到正确的源代码和 Source Map 文件。

## transition 和 animation 的区别 ？（2024-10-9）

transition 和 animation 都是 CSS 中用于创建动画效果的属性，但它们在实现方式、应用场景以及性能上存在一些显著的差异。以下是对这两者的详细比较：

### 一、实现方式

1. **transition（过渡）**：
   - 强调过渡效果，即在 CSS 属性的变化过程中进行平滑的过渡。
   - 需要手动触发，通常通过鼠标移动、点击等事件，或者通过伪类选择器（如:hover、:focus）来触发。
   - transition 只能触发一次播放一次，它类似于 flash 的补间动画，但只设置一个开始关键帧和一个结束关键帧。
2. **animation（动画）**：
   - 强调动画效果，可以创建更复杂和多样化的动画。
   - 不需要手动触发，是自动播放的。它使用@keyframes 来定义动画的关键帧，从而实现元素的动态变化效果。
   - 可以设置多个关键帧来完成动画，类似于 flash 的补间动画但更为灵活。

### 二、应用场景

1. **transition**：
   - 适用于简单的 CSS 属性变化，如背景色、透明度、尺寸等。
   - 常用于鼠标悬停、点击等交互事件中，实现元素的平滑过渡效果。
2. **animation**：
   - 适用于创建更复杂和多样化的动画效果，如元素的旋转、缩放、平移等复杂变换，以及多个动画状态之间的切换。
   - 可以用于页面的加载动画、元素的动态展示等场景。

### 三、性能差异

1. **transition**：
   - 通常不会引起页面的回流和重绘，因为 transition 一般结合 transform 等不会生成新位图的属性进行动画。
   - 对性能的影响相对较小。
2. **animation**：
   - 在改变 width、height、position 等改变文档流的属性时，会引起页面的回流和重绘。
   - 对性能的影响相对较大，特别是在动画涉及多个复杂属性变化时。

综上所述，transition 和 animation 在实现方式、应用场景以及性能上各有特点。在选择使用哪种方法时，需要根据具体的需求进行判断。如果只需要实现简单的动态效果，如背景色变化或尺寸缩放等，可以选择 transition；如果需要创建更复杂和多样化的动画效果，则可以选择 animation。

## 实现一个基于 Promise 的请求的重试（2024-10-8）

```js
/**
 *
 * @param task  返回一个promise的异步任务
 * @param count 需要重试的次数
 * @param time  每次重试间隔多久
 * @returns 返回一个新promise
 */
const retry = (task, count = 5, time = 3 * 1000) => {
  return new Promise((resolve, reject) => {
    let errorCount = 0;
    const run = () => {
      task()
        .then((res) => resolve(res))
        .catch((err) => {
          errorCount++;
          if (errorCount < count) {
            setTimeout(run, time);
          } else {
            reject(err);
          }
        });
    };
    run();
  });
};
```

## 上月总结（2024-10-1 至 2024-10-7）

**上个 EvertT 主要学习**

- Git 在 本地项目如何连接远程仓库
- 如何去修改 node_modules 包里面的代码
- npm run xxx 是执行什么命令呢？
- npm、yarn、pnpm 的区别？
- Vue 版本新增特性
- Vue 中 key 的 作用、scope 作用域原理、deep 样式穿透原理...
- Vue3 中的一些方法、特性、组件、优化...（ref、reactive、Teleport 组件...）
- 认识 HTTP 5 种传输方式
- treeShaking、HMR 热更新、babel 的原理理解
- 跨域问题以及预请求和 Vite 中的代理配置
- 前端中的竞态问题以及解决方案
- 浏览器的 Cookie、缓存机制、单点登录、无感刷新
- Javascript 本地存储的方式
- 前端跨页面通信的方法
- 在页面中如何添加水印，如何避免用户移除水印
- 如何判断元素是否在可视区域
- ES5 如何实现 let 和 const
- 如何去实现异步加载 script 脚本
- - 每日三问 -> 日常问题以及面试题
- ...

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
