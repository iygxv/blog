---
sidebar:
  title: 首屏优化
  step: 1
  isTimeLine: true
title: 首屏优化
tags:
  - 优化
categories:
  - 优化
---

# 首屏优化

## 什么是首屏优化？

首屏优化是指优化网页首次加载时用户看到的第一屏内容的加载速度和体验。它是前端性能优化中最重要的一环，直接影响用户的第一印象和留存率。

### 关键指标详解

#### FCP（First Contentful Paint）- 首次内容绘制
**定义**：浏览器首次绘制任何文本、图像、非白色canvas或SVG的时间

**测量方式**：
```javascript
// 监控FCP
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (entry.name === 'first-contentful-paint') {
      console.log('FCP时间:', entry.startTime);
    }
  }
});
observer.observe({entryTypes: ['paint']});
```

**优化目标**：
- 优秀：< 1.8秒
- 需要改进：1.8秒 - 3.0秒  
- 差：> 3.0秒

#### LCP（Largest Contentful Paint）- 最大内容绘制
**定义**：视口内最大的内容元素（图片、视频、文本块）完成渲染的时间

**常见LCP元素**：
- `<img>` 元素
- `<image>` 元素（在 `<svg>` 内）
- `<video>` 元素（使用封面图像）
- 具有背景图像的元素
- 包含文本节点的块级元素

**监控代码**：
```javascript
const observer = new PerformanceObserver((list) => {
  const entries = list.getEntries();
  const lastEntry = entries[entries.length - 1];
  
  console.log('LCP候选元素:', lastEntry.element);
  console.log('LCP时间:', lastEntry.startTime);
  console.log('元素大小:', lastEntry.size);
});
observer.observe({entryTypes: ['largest-contentful-paint']});
```

**优化目标**：
- 优秀：< 2.5秒
- 需要改进：2.5秒 - 4.0秒
- 差：> 4.0秒

#### FID（First Input Delay）- 首次输入延迟
**定义**：用户首次与页面交互（点击链接、按钮等）到浏览器响应的时间

**影响因素**：
- JavaScript执行时间
- 主线程阻塞
- 第三方脚本

**监控示例**：
```javascript
import {getFID} from 'web-vitals';

getFID((metric) => {
  console.log('FID:', metric.value);
  console.log('输入类型:', metric.entries[0].name);
  console.log('延迟时间:', metric.entries[0].processingStart - metric.entries[0].startTime);
});
```

**优化目标**：
- 优秀：< 100毫秒
- 需要改进：100毫秒 - 300毫秒
- 差：> 300毫秒

#### CLS（Cumulative Layout Shift）- 累积布局偏移
**定义**：页面生命周期内所有意外布局偏移的累积分数

**计算公式**：
```javascript
// CLS = Impact Fraction × Distance Fraction
const calculateCLS = (impactFraction, distanceFraction) => {
  return impactFraction * distanceFraction;
};
```

**常见原因**：
- 没有尺寸的图片
- 没有尺寸的广告、嵌入和iframe
- 动态注入的内容
- Web字体加载导致的文本闪烁

**监控代码**：
```javascript
let clsValue = 0;
let clsEntries = [];

const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    if (!entry.hadRecentInput) {
      clsValue += entry.value;
      clsEntries.push(entry);
      
      console.log('CLS元素:', entry.sources);
      console.log('偏移值:', entry.value);
    }
  }
});
observer.observe({entryTypes: ['layout-shift']});
```

**优化目标**：
- 优秀：< 0.1
- 需要改进：0.1 - 0.25
- 差：> 0.25

#### 其他重要指标

**TTFB（Time to First Byte）- 首字节时间**
```javascript
// 测量TTFB
const navigationEntry = performance.getEntriesByType('navigation')[0];
const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
console.log('TTFB:', ttfb);
```

**TTI（Time to Interactive）- 可交互时间**
```javascript
// 使用Lighthouse API测量TTI
import {computeMainThreadTasks} from 'lighthouse/lighthouse-core/lib/tracehouse/main-thread-tasks.js';

function calculateTTI(trace) {
  const tasks = computeMainThreadTasks(trace);
  // TTI计算逻辑
  return tti;
}
```

**Speed Index - 速度指数**
```javascript
// 视觉进度监控
const observer = new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log('视觉进度:', entry.startTime);
  }
});
observer.observe({entryTypes: ['measure']});
```

## 为什么首屏优化很重要？

### 用户体验影响
- **3秒定律**：超过3秒的加载时间会让53%的移动用户离开
- **转化率影响**：加载时间每增加1秒，转化率下降7%
- **SEO影响**：页面速度是Google搜索排名的重要因素

### 商业价值
```javascript
// 首屏时间与业务指标的关系
const performanceImpact = {
  loadTime: '1s',
  conversionRate: '100%',
  userSatisfaction: '95%'
}

// 当加载时间增加时
const degradedPerformance = {
  loadTime: '3s',
  conversionRate: '79%',  // 下降21%
  userSatisfaction: '67%' // 下降28%
}
```

## 首屏优化策略

### 1. 资源优化

#### 图片优化
```html
<!-- 使用现代图片格式 -->
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.avif" type="image/avif">
  <img src="hero.jpg" alt="英雄图片" loading="lazy" fetchpriority="high">
</picture>

<!-- 响应式图片 -->
<img 
  srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
  sizes="(max-width: 480px) 480px, (max-width: 800px) 800px, 1200px"
  src="medium.jpg"
  alt="响应式图片"
  loading="lazy"
>
```

**优化要点**：
- 使用WebP/AVIF等现代格式，减少50%+文件大小
- 设置`loading="lazy"`实现原生懒加载
- 关键图片使用`fetchpriority="high"`优先加载
- 根据设备宽度提供不同尺寸的图片

#### CSS优化
```html
<!-- 内联关键CSS -->
<style>
/* 首屏关键样式 */
.hero {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.hero-title {
  font-size: 3rem;
  color: white;
  text-align: center;
}
</style>

<!-- 异步加载非关键CSS -->
<link rel="preload" href="styles.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="styles.css"></noscript>
```

**优化要点**：
- 内联首屏关键CSS，避免渲染阻塞
- 异步加载非关键CSS
- 使用Critical工具自动提取关键CSS
- 启用CSS压缩和合并

#### JavaScript优化
```javascript
// 代码分割
const LazyComponent = lazy(() => import('./LazyComponent'));

// 动态导入
async function loadFeature() {
  const { default: Feature } = await import('./Feature');
  return Feature;
}
```

```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/js/critical.js" as="script">
<link rel="preload" href="/api/critical-data" as="fetch" crossorigin>
```

**优化要点**：
- 使用动态导入进行代码分割
- 延迟加载非关键JavaScript
- 预加载关键脚本和数据
- 避免长任务阻塞主线程

### 2. 渲染优化

#### 服务端渲染(SSR)
```javascript
// Next.js SSR示例
export async function getServerSideProps(context) {
  // 在服务端获取数据
  const data = await fetchCriticalData();
  
  return {
    props: {
      data
    }
  }
}

export default function HomePage({ data }) {
  return (
    <div>
      <h1>首屏内容</h1>
      <CriticalComponent data={data} />
    </div>
  );
}
```

#### 静态生成(SSG)
```javascript
// 构建时生成静态页面
export async function getStaticProps() {
  const posts = await getBlogPosts();
  
  return {
    props: { posts },
    revalidate: 3600 // 每小时重新生成
  }
}
```

### 3. 缓存策略

#### HTTP缓存
```javascript
// 设置缓存头
app.get('/static/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1年
  res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  next();
});
```

#### Service Worker缓存
```javascript
// sw.js
const CACHE_NAME = 'my-app-v1';
const urlsToCache = [
  '/',
  '/styles/main.css',
  '/scripts/main.js',
  '/images/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
```

### 4. 网络层优化

#### 缓存策略
```javascript
// HTTP缓存配置
app.get('/static/*', (req, res, next) => {
  res.setHeader('Cache-Control', 'public, max-age=31536000'); // 1年
  res.setHeader('Expires', new Date(Date.now() + 31536000000).toUTCString());
  next();
});
```

#### 资源压缩
```javascript
// 启用Gzip压缩
app.use(compression({
  threshold: 1024, // 只压缩大于1KB的文件
  level: 6 // 压缩级别
}));
```

#### CDN和预加载
```html
<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//cdn.example.com">
<link rel="dns-prefetch" href="//api.example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">

<!-- 资源预加载 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
```

**优化要点**：
- 配置合理的HTTP缓存策略
- 启用Gzip/Brotli压缩
- 使用CDN加速静态资源
- DNS预解析和资源预加载
```

## 实战案例

### Vue项目首屏优化

#### 1. 路由懒加载
```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue') // 懒加载
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  }
];
```

#### 2. 组件懒加载
```vue
<template>
  <div>
    <!-- 首屏关键内容 -->
    <Header />
    <Hero />
    
    <!-- 懒加载非关键组件 -->
    <Suspense>
      <template #default>
        <LazyComponent />
      </template>
      <template #fallback>
        <div class="loading">加载中...</div>
      </template>
    </Suspense>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
  components: {
    Header: () => import('@/components/Header.vue'),
    Hero: () => import('@/components/Hero.vue'),
    LazyComponent: defineAsyncComponent(() => import('@/components/LazyComponent.vue'))
  }
}
</script>
```

#### 3. 预加载优化
```html
<!-- 预加载关键资源 -->
<link rel="preload" href="/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/images/hero.webp" as="image">

<!-- DNS预解析 -->
<link rel="dns-prefetch" href="//api.example.com">
<link rel="dns-prefetch" href="//cdn.example.com">

<!-- 预连接 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

### React项目优化

#### 1. 代码分割
```javascript
import React, { Suspense, lazy } from 'react';

// 懒加载组件
const Dashboard = lazy(() => import('./Dashboard'));
const Settings = lazy(() => import('./Settings'));

function App() {
  return (
    <div>
      <nav>
        <Link to="/dashboard">仪表板</Link>
        <Link to="/settings">设置</Link>
      </nav>
      
      <Suspense fallback={<div>加载中...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </div>
  );
}
```

#### 2. 资源预加载Hook
```javascript
import { useEffect } from 'react';

function usePreloadRoute(routeComponent) {
  useEffect(() => {
    // 鼠标悬停时预加载
    const link = document.querySelector(`[href="${routeComponent}"]`);
    if (link) {
      link.addEventListener('mouseenter', () => {
        import(routeComponent);
      });
    }
  }, [routeComponent]);
}

// 使用
function Navigation() {
  usePreloadRoute('./Dashboard');
  
  return (
    <nav>
      <Link to="/dashboard">仪表板</Link>
    </nav>
  );
}
```

### 骨架屏实现

#### 1. CSS骨架屏
```css
.skeleton {
  animation: skeleton-loading 1s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsl(200, 20%, 80%);
  }
  100% {
    background-color: hsl(200, 20%, 95%);
  }
}

.skeleton-text {
  width: 100%;
  height: 1rem;
  border-radius: 0.25rem;
}

.skeleton-title {
  width: 60%;
  height: 1.5rem;
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}
```

#### 2. Vue骨架屏组件
```vue
<template>
  <div class="skeleton-container">
    <div class="skeleton skeleton-title"></div>
    <div class="skeleton skeleton-text"></div>
    <div class="skeleton skeleton-text" style="width: 80%"></div>
    <div class="skeleton skeleton-text" style="width: 60%"></div>
  </div>
</template>

<script>
export default {
  name: 'SkeletonLoader'
}
</script>
```

#### 3. 自动生成骨架屏
```javascript
// 使用puppeteer自动生成骨架屏
const puppeteer = require('puppeteer');

async function generateSkeleton(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto(url);
  
  // 注入骨架屏生成脚本
  await page.evaluate(() => {
    // 将所有文本元素替换为骨架占位符
    document.querySelectorAll('*').forEach(el => {
      if (el.children.length === 0 && el.textContent.trim()) {
        el.className += ' skeleton skeleton-text';
        el.textContent = '';
      }
    });
  });
  
  const html = await page.content();
  await browser.close();
  
  return html;
}
```

## 性能监控

### 1. 性能指标监控
```javascript
// 监控Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // 发送到分析服务
  gtag('event', metric.name, {
    event_category: 'Web Vitals',
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_label: metric.id,
    non_interaction: true,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### 2. 用户体验监控
```javascript
// 监控首屏时间
function measureFirstScreen() {
  const observer = new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    
    // 首屏时间
    const firstScreenTime = lastEntry.startTime + lastEntry.duration;
    
    console.log('首屏时间:', firstScreenTime);
    
    // 上报数据
    navigator.sendBeacon('/api/performance', JSON.stringify({
      metric: 'first-screen',
      value: firstScreenTime,
      url: location.href
    }));
    
    observer.disconnect();
  });
  
  observer.observe({ entryTypes: ['largest-contentful-paint'] });
}

// 页面加载完成后执行
if (document.readyState === 'complete') {
  measureFirstScreen();
} else {
  window.addEventListener('load', measureFirstScreen);
}
```

## 工具推荐

### 1. 性能分析工具
- **Lighthouse**：Google开源的性能分析工具
- **WebPageTest**：在线网页性能测试
- **Chrome DevTools**：浏览器内置的性能分析工具

### 2. 构建优化工具
```javascript
// webpack.config.js
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    // 预加载插件
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial'
    })
  ]
};
```

### 3. Vite优化配置
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router'],
          utils: ['lodash', 'moment']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['vue', 'vue-router'],
    exclude: ['some-large-lib']
  }
};
```

## 最佳实践总结

### 优化检查清单

#### 资源层面
- 启用Gzip/Brotli压缩
- 使用CDN加速静态资源
- 优化图片格式和大小
- 内联关键CSS
- 异步加载非关键资源

#### 代码层面
- 实现代码分割
- 移除未使用的代码
- 使用Tree Shaking
- 优化包大小

#### 渲染层面
- 实现骨架屏
- 优化关键渲染路径
- 减少DOM操作
- 使用虚拟滚动

#### 网络层面
- 启用HTTP/2
- 使用Service Worker
- 实现资源缓存策略
- DNS预解析

### 性能预算
```javascript
// 设置性能预算
const performanceBudget = {
  firstContentfulPaint: 2000,    // 2秒
  largestContentfulPaint: 2500,  // 2.5秒
  firstInputDelay: 100,          // 100毫秒
  cumulativeLayoutShift: 0.1,    // 0.1
  totalBlockingTime: 300         // 300毫秒
};

// 监控并告警
function checkPerformanceBudget(metrics) {
  Object.keys(performanceBudget).forEach(metric => {
    if (metrics[metric] > performanceBudget[metric]) {
      console.warn(`性能预算超标: ${metric}`, {
        budget: performanceBudget[metric],
        actual: metrics[metric]
      });
    }
  });
}
```

## 常见问题与解决方案

### 1. 首屏白屏问题

**主要原因**：
- JavaScript执行阻塞渲染
- CSS加载阻塞渲染
- 资源加载失败

**解决方案**：
- 内联关键CSS，避免外部CSS阻塞
- 使用骨架屏提供视觉反馈
- 添加loading状态和错误处理
- 实施资源预加载策略

### 2. 字体闪烁问题 (FOIT/FOUT)

**解决方案**：
```css
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* 立即显示备用字体 */
}
```

```html
<!-- 预加载关键字体 -->
<link rel="preload" href="/fonts/critical.woff2" as="font" type="font/woff2" crossorigin>
```

**优化要点**：
- 使用`font-display: swap`立即显示备用字体
- 预加载关键字体文件
- 字体子集化减少文件大小
- 合理选择字体格式(WOFF2优先)

### 3. 图片加载优化问题

**主要问题**：
- 大图片阻塞首屏渲染
- 未使用懒加载导致不必要的网络请求
- 缺少占位图造成布局偏移

**解决方案**：
- 使用原生`loading="lazy"`懒加载
- 为图片设置明确的宽高避免布局偏移
- 使用占位图或骨架屏提供视觉反馈
- 采用渐进式JPEG格式

### 4. JavaScript 阻塞问题

**主要问题**：
- 大型JavaScript文件阻塞页面渲染
- 同步脚本阻塞HTML解析
- 未使用代码分割导致首屏加载过慢

**解决方案**：
- 使用`async`和`defer`属性异步加载脚本
- 实施代码分割，按需加载功能模块
- 将非关键脚本延迟到用户交互时加载
- 使用动态导入(`import()`)懒加载组件

### 5. CSS阻塞渲染问题

**主要问题**：
- 外部CSS文件阻塞页面渲染
- 非关键CSS影响首屏显示
- CSS文件过大导致加载缓慢

**解决方案**：
- 内联关键CSS，避免阻塞渲染
- 异步加载非关键CSS
- 使用媒体查询条件加载CSS
- 压缩和合并CSS文件

### 6. 第三方脚本优化

**主要问题**：
- 第三方脚本影响首屏性能
- 不可控的外部资源加载时间
- 缺少降级和错误处理

**解决方案**：
- 延迟加载非关键第三方脚本
- 使用`requestIdleCallback`在空闲时加载
- 为第三方资源设置超时和降级方案
- 监控第三方资源的性能影响

## 总结

首屏优化是一个系统性工程，需要从多个维度进行优化：

1. **资源优化**：压缩、缓存、CDN
2. **代码优化**：分割、懒加载、Tree Shaking  
3. **渲染优化**：SSR、骨架屏、关键渲染路径
4. **监控优化**：性能指标、用户体验、持续改进

记住，优化是一个持续的过程，需要：
- 建立性能监控体系
- 设置合理的性能预算
- 定期分析和优化
- 平衡功能和性能

通过这些策略和实践，你可以显著提升网站的首屏加载速度，改善用户体验，提高业务转化率。

## 参考资料

- [Web.dev Performance](https://web.dev/performance/)
- [MDN Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API)
- [为vue项目添加骨架屏](https://xiaoiver.github.io/coding/2017/07/30/%E4%B8%BAvue%E9%A1%B9%E7%9B%AE%E6%B7%BB%E5%8A%A0%E9%AA%A8%E6%9E%B6%E5%B1%8F.html)


