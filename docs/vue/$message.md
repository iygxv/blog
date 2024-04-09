---
sidebar: 
 title: 组件中$message是如何实现的呢？
 step: 1
 isTimeLine: true
title: 组件中$message是如何实现的呢？
tags:
 - Vue2
 - Vue3
categories:
 - Vue2
 - Vue3
---

# 组件中$message 是如何实现的呢？

我们可以在组件库中发现一些组件可以通过 `$message` 来调用，例如在 `element-ui` 中的 el-message，它的调用方法

```js
 this.$message({
  message: '恭喜你，这是一条成功消息',
  type: 'success'
});
```

这样的组件使用方式还有 `$toast、$confirm` 等等，那么这类组件为什么可以 `$message` 这样子调用呢？接下来我们来分析实现一下。

## 揭晓实现方式

要实现这样的组件调用方式，有以下的步骤：

- 创建一个 message.vue 组件
- 通过 vue.extend, 创建子类实例 （这是 vue2 的方式）`①`
- 将子类的节点（$el）,挂载到 body 中 `②`
- 以`① ②`过程封装为一个方法 createMessage
- 然后通过 将这个方法挂载到 Vue 原型上面（Vue.prototype.$message = createMessage）

:::tip Vue.extend 介绍
Vue.extend 使用基础 Vue 构造器，创建一个`子类`。参数是一个包含组件选项的对象
:::

下面我们一步步分析实现方式的步骤，这里主要先讲 vue2 的方式， 后面在补充 vue3 的

## 创建一个 message.vue 组件

创建一个 message.vue 组件 也比较简单，这里展示一下代码：

```vue
<template>
  <transition name="w-message-fade">
    <div :class="['w-message', `w-message-${type}`]" :style="positionStyle" v-show="visible">
      <i :class="['w-icon-message', 'w-message-before-icon', `w-message-before-icon-${type}`]"></i>
      <div :class="['w-message__content']">{{ message }}</div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Message',
  data() {
    return {
      closed: false,
      visible: false,
      message: 'message',
      type: 'warning',
      duration: 3000,
      top: 20,
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.top}px`
      };
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false;
        this.$destroy(true);
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  },
  methods: {
    close() {
      this.closed = true;
      this.onClone(this.id)
    },
    clearTimer() {
      clearTimeout(this.timer);
    },
    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close();
          }
        }, this.duration);
      }
    },
  },
  mounted() {
    this.startTimer();
  },
  beforeDestroy() {
    this.clearTimer();
  },
}
</script>

<style lang='scss' scoped>
@use "sass:math";

$--color-primary: #409EFF !default;
$--color-white: #FFFFFF !default;
$--color-black: #000000 !default;
$--color-success: #67C23A !default;
$--color-warning: #E6A23C !default;
$--color-danger: #F56C6C !default;
$--color-info: #909399 !default;


$--color-success-light: mix($--color-white, $--color-success, 80%) !default;
$--color-warning-light: mix($--color-white, $--color-warning, 80%) !default;
$--color-danger-light: mix($--color-white, $--color-danger, 80%) !default;
$--color-info-light: mix($--color-white, $--color-info, 80%) !default;

$--color-success-lighter: mix($--color-white, $--color-success, 90%) !default;
$--color-warning-lighter: mix($--color-white, $--color-warning, 90%) !default;
$--color-danger-lighter: mix($--color-white, $--color-danger, 90%) !default;
$--color-info-lighter: mix($--color-white, $--color-info, 90%) !default;

$--message-success-font-color: $--color-success !default;
$--message-info-font-color: $--color-info !default;
$--message-warning-font-color: $--color-warning !default;
$--message-danger-font-color: $--color-danger !default;

.w-message {
  min-width: 380px;
  box-sizing: border-box;
  border-radius: 4px;
  border: 1px solid #ebeef5;
  position: fixed;
  left: 50%;
  top: 20px;
  transform: translateX(-50%);
  background-color: #edf2fc;
  transition: opacity .3s, transform .4s, top .4s;
  overflow: hidden;
  padding: 15px 15px 15px 20px;
  display: flex;
  align-items: center;
  font-size: 14px;
  z-index: 999;

  &-info {
    background-color: $--color-info-lighter;
    border-color: $--color-info-light;

    .w-message__content {
      color: $--message-info-font-color;
    }
  }

  &-success {
    background-color: $--color-success-lighter;
    border-color: $--color-success-light;

    .w-message__content {
      color: $--message-success-font-color;
    }
  }

  &-warning {
    background-color: $--color-warning-lighter;
    border-color: $--color-warning-light;

    .w-message__content {
      color: $--message-warning-font-color;
    }
  }

  &-danger {
    background-color: $--color-danger-lighter ;
    border-color: $--color-danger-light;

    .w-message__content {
      color: $--message-danger-font-color;
    }
  }

  &-close {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
    color: #c0c4cc;
    font-size: 16px;
    cursor: pointer;
  }

  &-before-icon {
    margin-right: 10px;

    &-info {
      color: $--color-info;
    }

    &-success {
      color: $--color-success;
    }

    &-warning {
      color: $--color-warning;
    }

    &-danger {
      color: $--color-danger;
    }
  }
}

.w-message-fade-enter,
.w-message-fade-leave-active {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>

```

上面就是 message 的相关代码，代码理解比较简单，这里就不介绍了

## 通过 vue.extend, 创建子类实例

```js
import Vue from 'vue';
import Message from './Message.vue';
const MessageConstructor = Vue.extend(Message);
```

这里的 MessageConstructor 是一个构造器，可以通过 new 来创建实例

```js
const instance  = new MessageConstructor({
  data: options
}
```

上面的 options 是我们传过去的参数

## 挂载实例节点到 body

在上面代码中，我们已经创建好了实例 instance， 然后我们需要将子类的节点（$el）,挂载到 body 中

```js
 // 在实例挂载之后，元素可以用 vm.$el 访问。
instance.$mount()
 document.body.appendChild(instance.$el)
```

这里需要注意的一点是 实例是需要通过 `$mount()` 挂载之后，元素可以用 vm.$el 访问

## createMessage 方法

```js
import Vue from 'vue';
import Message from './Message.vue';
// Vue.extend 使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
let MessageConstructor = Vue.extend(Message);

let instance = null;
let instances = [];
let seed = 1;
let zIndex = 2000;


const createMessage = function (options) {
  options = options || {};
  let id = 'message_' + seed++; // 唯一标识
  instance = new MessageConstructor({
    data: options
  });
  instance.onClone = function(id) {
    let len = instances.length;
    let index = -1;
    let removedHeight;
    for (let i = 0; i < len; i++) {
      if (id === instances[i].id) {
        removedHeight = instances[i].$el.offsetHeight;
        index = i;
        instances.splice(i, 1);
        break;
      }
    }
    if (len <= 1 || index === -1 || index > instances.length - 1) return;
    for (let i = index; i < len - 1 ; i++) {
      let dom = instances[i].$el;
      // 其他实例的top值减去当前实例的高度
      dom.style['top'] =
        parseInt(dom.style['top'], 10) - removedHeight - 16 + 'px';
    }
  };
  instance.id = id;
  // 在实例挂载之后，元素可以用 vm.$el 访问。
  instance.$mount();
  document.body.appendChild(instance.$el);
  let top = options.offset || 40;
  instances.forEach(item => {
    top += item.$el.offsetHeight + 16;
  });
  instance.top = top;
  instance.visible = true;
  instance.$el.style.zIndex = zIndex++;
  instances.push(instance);
  return instance;
};

```

## 挂载到 Vue 原型上面

```js
Message.install = function (Vue) {
  // Vue.component(Message.name, Message)
  Vue.prototype.$message = createMessage
}
```

## demo 项目

具体的一个 demo 测试项目地址

https://github.com/iygxv/demo/tree/main/vue-message-demo

### vue3 方式实现

vue3 的方式也差不多一样

只不过 vue3 是使用 createApp 来创建实例， 具体可以看 demo 项目

https://github.com/iygxv/demo/tree/main/vue3-message-demo


<br/>

<hr />

⭐️⭐️⭐️好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ヽ(°▽°)ノ✿

撒花 🌸🌸🌸🌸🌸🌸