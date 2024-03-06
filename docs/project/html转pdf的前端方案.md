---
sidebar: 
 title: html转pdf的前端方案
 step: 1
 isTimeLine: true
title: html转pdf的前端方案
tags:
 - 项目
categories:
 - 项目
---

# html转pdf的前端方案

## 简介
本文主要介绍 html 转 pdf 的前端方案， 首先会先介绍 jspdf 的一些基本使用， 然后会解决一些常见问题，例如：分页截断、添加页头页脚


## jspdf 的一些基本使用

### 安装
:::=tabs
::npm
npm install jspdf
::yarn
yarn add jspdf
:::

### 文字生成 PDF
```js
 // 默认a4大小，竖直方向，mm单位的PDF
const doc = new jsPDF();

// 添加文本
doc.text("Hello world!", 10, 10);

doc.save("a4.pdf");
```

### 图片生成PDF
官方文档链接[addImage](https://artskydj.github.io/jsPDF/docs/module-addImage.html)

```js
const doc = new jsPDF();

doc.addImage("https://www.icodehub.top/seeking-wd/test.png", "JPEG", 40, 10, 100, 100);

doc.save("a4.pdf");
```

