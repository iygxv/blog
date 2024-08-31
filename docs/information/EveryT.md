---
top: 1
sticky: 1000
sidebar:
  title: EveryT
  step: 5
  isTimeLine: true
title: EveryT
tags:
  - 笔记
categories:
  - 笔记
---

# EveryT

## 每日 3 问（2024-08-31）
### vue 中的 key 有什么作用呢？
每个元素都有一个唯一的 key 值，Vue 使用这个 key 来跟踪每个节点的身份，从而复用现有元素，提高渲染性能

```js
const isSameVNodeType = (n1, n2) => {
  return n1.type === n2.type && n1.key === n2.key
}

function diff(oldVNode, newVNode) {
  if (isSameVNodeType(oldVNode, newVNode)) {
    // 比较节点
  }else {
    // 没啥好比，直接整个节点替换
  }
}

```
### scope 作用域隔离的原理
- 通过给组件里面的元素添加一个唯一的 `data-v-xxx` 属性来保证他的唯一性
- 会在每句编译后的 css 选择器末尾添加一个当前组件的属性选择器（如[data-v-69538f99]）来私有化样式
- 如果组件内部还有其他组件，只会给`其他组件的最外层元素添加当前组件的 data-v-xxx 属性`，这也就是为什么我们修改一些第三方ui库的样式时需要使用深度选择器 `:deep()` 实现样式穿透的原因，因为第三方的子组件内部的元素不会添加当前组件的 `data-v-xxx` 属性，而转译后的 css 又会在末尾添加含有该 `data-v-xxx` 属性的属性选择器，这样就会导致设置的样式无法准确命中。

<img src="./assets/scope-example.png" alt="deep-example" />

### vue 样式穿透（deep）的原理
先来看一个例子，下面为 input 使用 还是未使用 deep 都 展示了css 样式编译后的结果
```css
<style scoped lang="scss">
.deep-scope-demo {
  /* 不加 depp */
  input {
    background-color: skyblue;
  }
  /* 加入 depp */
  :deep(input) {
    background-color: skyblue;
  }
}
</style>
```
**没使用:deep()之前，css 样式编译后的结果是**

```css
.deep-scope-demo input[data-v-7a7a37b1] {
   background-color: skyblue;
}
```
但是 scoped 的特性只会在子组件的最外层元素添加上父组件的 data-v-xxx 属性， 所以 input 是没有 data-v-xxx 属性的，因此编译后的 css 样式无法找到该元素。

**使用:deep()之前，css 样式编译后的结果是**

```css
.deep-scope-demo[data-v-7a7a37b1] input {
   background-color: skyblue;
}
```
可以看到，使用:deep()之后，编译后的 css 样式中，添加了上层元素添加了 data-v-xxx 属性，因此可以找到该元素。

因此：**使用 deep 之后，编译后的 css 样式中，添加了上层元素添加了 data-v-xxx 属性，因此可以找到该元素。**


## token 无感刷新你了解多少呢？（2024-08-30）

### token 无感刷新的定义

token 无感刷新：指的是在用户操作应用程序时，如果 accessToken（访问令牌）即将过期或已过期，系统能够自动使用 refreshToken（刷新令牌）获取新的 accessToken，而无需用户重新登录或进行任何额外操作。这种机制确保了用户在使用应用时的流畅性和连贯性。

### 实现原理

token 无感刷新的实现主要依赖于双 token 机制，即 accessToken 和 refreshToken：

- **accessToken（访问令牌）**：
  - 用户直接用于访问受保护资源的令牌
  - 有效期通常较短，几分钟到几小时不等，以减少被泄露的风险
  - 每次用户请求受保护资源时，都需在请求头中携带 accessToken
- **refreshToken（刷新令牌）**：
  - 用于在 accessToken 过期后重新获取新的 accessToken
  - 有效期较长，可以是几天甚至更长，以减少用户重新登录的频率
  - refreshToken 不会频繁在网络上传输，而是安全存储在客户端或服务器端，以降低被窃取的风险

### 实现步骤

- **获取 accessToken 和 refreshToken**
  - 在用户认证成功后，后端应返回 accessToken 和 refreshToken 给客户端
  - 客户端将这两个 token 保存到本地缓存中
- **设置请求拦截器**
  - 在客户端设置请求拦截器，用于在发送请求前检查 accessToken 的有效性
  - 如果 accessToken 即将过期或已过期，拦截器会暂停当前请求，并使用 refreshToken 向后端发送刷新请求
- **刷新 accessToken**
  - 后端接收到 refreshToken 的刷新请求后，验证其有效性
  - 如果 refreshToken 有效，后端生成一个新的 accessToken 并返回给客户端
- **更新 token 并继续请求**
  - 客户端收到新的 accessToken 后，替换本地缓存中的旧 token
  - 使用新的 accessToken 继续之前的请求

### 优势和应用场景

- 优势：
  - **提升用户体验**：用户无需频繁登录，操作更加流畅
  - **增强安全性**：通过分离短期和长期凭证，降低了 token 被泄露的风险
  - **减少服务器负载**：减少了因用户频繁登录而产生的服务器请求
- 应用场景：
  - Web 应用
  - 移动应用
  - 单页应用
  - 需要长生命周期 token 和多终端登录的场景

:::tip 注意事项

- **安全性**：确保 refreshToken 的安全存储和传输，避免被窃取
- **时间同步**：客户端和服务器之间的时间同步对于 token 有效性的判断至关重要
- **错误处理**：在 token 刷新过程中，应妥善处理可能出现的错误情况，如 refreshToken 过期或无效等
:::

### 代码实现

需要注意会出现的 `2` 个问题

**如何防止多次刷新 token**

我们通过一个变量 isRefreshing 去控制是否在刷新 token 的状态

```js
import axios from "axios";
// 是否正在刷新的标记
let isRefreshing = false;

service.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken({
          refreshToken: localStorage.getItem("refreshToken"),
          token: getToken(),
        })
          .then((res) => {
            const { token } = res.data;
            setToken(token);
            response.headers.Authorization = `${token}`;
          })
          .catch((err) => {
            removeToken();
            router.push("/login");
            return Promise.reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      }
    }
    return response && response.data;
  },
  (error) => {
    Message.error(error.response.data.msg);
    return Promise.reject(error);
  }
);
```

**同时发起两个或者两个以上的请求时，其他接口怎么解决**

当第二个过期的请求进来，token 正在刷新，我们先将这个请求存到一个数组队列中，想办法让这个请求处于等待中，一直等到刷新 token 后再逐个重试清空请求队列。 那么如何做到让这个请求处于等待中呢？为了解决这个问题，我们得借助 Promise。将请求存进队列中后，同时返回一个 Promise，让这个 Promise 一直处于 Pending 状态（即不调用 resolve），此时这个请求就会一直等啊等，只要我们不执行 resolve，这个请求就会一直在等待。当刷新请求的接口返回来后，我们再调用 resolve，逐个重试。最终代码：

```js
import axios from "axios";

// 是否正在刷新的标记
let isRefreshing = false;
//重试队列
let requests = [];
service.interceptors.response.use(
  (response) => {
    //约定code 409 token 过期
    if (response.data.code === 409) {
      if (!isRefreshing) {
        isRefreshing = true;
        //调用刷新token的接口
        return refreshToken({
          refreshToken: localStorage.getItem("refreshToken"),
          token: getToken(),
        }).then((res) => {
            const { token } = res.data;
            // 替换token
            setToken(token);
            response.headers.Authorization = `${token}`;
            // token 刷新后将数组的方法重新执行
            requests.forEach((cb) => cb(token));
            requests = []; // 重新请求完清空
            return service(response.config);
          }).catch((err) => {
            //跳到登录页
            removeToken();
            router.push("/login");
            return Promise.reject(err);
          }).finally(() => {
            isRefreshing = false;
          });
      } else {
        // 返回未执行 resolve 的 Promise
        return new Promise((resolve) => {
          // 用函数形式将 resolve 存入，等待刷新后再执行
          requests.push((token) => {
            response.headers.Authorization = `${token}`;
            resolve(service(response.config));
          });
        });
      }
    }
    return response && response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
```

## 单点登录（SSO） 你了解多少呢？（2024-08-29）

### 单点登录的定义

单点登录（SSO）是指用户只需要在多个应用系统中的任意一个进行登录，就可以访问所有相互信任的应用系统，而无需在每个系统中重新输入凭证（如用户名和密码）。这种机制通过共享用户的登录状态来实现，使得用户能够无缝地在多个系统之间切换。

简言之：用户在企业内部多个应用系统（如考勤系统、财务系统、人事系统等）场景下，用户只需要登录一次，就可以访问多个应用系统。

### 单点登录的实现方式

- **基于 Cookie 和 Session 的实现**
  - 用户登录后，`认证服务器`将用户信息存储在 Session 中，并生成一个 Session ID
  - 将 Session ID 存储在 Cookie 中，并返回给用户浏览器
  - 用户访问其他应用系统时，浏览器会自动携带 Cookie 中的 Session ID
  - 应用系统通过 Session ID 向认证服务器验证用户身份，如果验证通过，则允许用户访问系统资源
- **基于 Token 的实现**
  - 用户登录后，`认证服务器`生成一个 Token，并将 Token 存储在共享的存储中（如 Redis、数据库等）
  - 将 Token 返回给用户，用户可以在后续请求中携带 Token
  - 应用系统通过向认证服务器验证 Token 的有效性来确认用户身份

:::tip 提示
**用户是项认证中心登录的**
:::

### 单点登录的优势

- **提升用户体验**：用户只需一次登录，即可访问多个系统，无需反复输入凭证，提高了使用便捷性
- **减轻用户记忆负担**：用户只需记住一套用户名和密码，降低了记忆难度和混淆风险
- **增强安全性**：集中管理身份验证和授权机制，可以实施更强大的安全措施，如多因素认证
- **简化管理和维护**：对于企业和组织来说，用户账户和权限的管理变得更加简便，降低了管理和维护成本
- **降低密码管理复杂性**：用户不再需要在不同应用中设置和更新多个独立的密码

### 单点登录的劣势

- **安全风险增加**：如果 SSO 系统本身出现故障或被攻击，那么所有依赖该系统的应用程序和服务都将受到影响，可能导致用户无法访问这些服务
- **实施复杂性**：整合不同应用程序和服务的身份验证机制可能需要大量的开发和配置工作。不同系统之间的技术差异和兼容性问题可能使得 SSO 的实施变得复杂
- **用户体验问题**：在 SSO 环境中，确保用户在注销时正确地从所有关联的应用程序和服务中注销可能是一个挑战。如果注销过程没有得到妥善处理，可能会导致安全隐患或用户体验问题
- **实施和维护成本**：尽管 SSO 可以降低支持成本（如减少密码重置请求等），但实施和维护 SSO 解决方案本身可能需要额外的投资。组织需要权衡成本和收益，以确定 SSO 是否适合其需求

### 单点登录的应用场景

单点登录广泛应用于需要多个系统协同工作的场景，如企业内部管理系统（如 OA、ERP、CRM 等）、电商平台（如淘宝、天猫等）、在线教育平台等。这些场景下的用户需要频繁地在多个系统之间切换，单点登录能够显著提升用户的使用体验和系统的安全性。

### 单点登录的挑战与解决方案

尽管单点登录带来了诸多优势，但在实际应用中也面临一些挑战，如跨域身份验证、Token 的安全传输和存储等。针对这些挑战，可以采取以下解决方案：

- **跨域身份验证**：通过 CORS（跨源资源共享）机制或设置代理服务器来实现跨域身份验证
- **Token 的安全传输**：使用 HTTPS 协议来加密 Token 的传输过程，防止 Token 被截获和篡改
- **Token 的安全存储**：将 Token 存储在安全的存储介质中（如浏览器的 LocalStorage），并设置合理的过期时间和访问权限

综上所述，单点登录是一种高效、便捷且安全的身份验证和授权机制，它在提升用户体验、减轻用户记忆负担、增强系统安全性等方面发挥着重要作用，然而，单点登录也面临一些挑战和限制，需要权衡成本和收益，根据具体需求选择合适的解决方案。

### 单点登录建议过程图

<img src="./assets/sso.png" alt="单点登录建议过程图" />

### 资料

[一站式登录：揭秘 CAS 单点登录的原理与流程](https://juejin.cn/post/7351700046486487049)

## 浏览器的缓存机制你了解多少呢？（2024-08-28）

览器缓存机制主要通过将用户之前请求过的资源（如 HTML、CSS、JavaScript、图片等）保存在本地，以便在后续请求时直接使用这些缓存的资源，而无需再次从服务器下载。这样可以显著提高页面加载速度，提升用户体验。

### 缓存类型

- **强缓存（Forced Caching）**
- **协商缓存（Revalidating Caching）**
- Service Worker 缓存
- Web Storage 缓存

### 强缓存（Forced Caching）

- **原理**：浏览器在请求资源时，会先检查本地缓存是否存在该资源的副本，并且该副本是否未过期。如果副本未过期，则直接使用本地缓存，不会向服务器发送请求。
- **实现方式**：主要依赖于 HTTP 响应头中的 `Expires` 和 `Cache-Control` 字段。`Expires` 是 HTTP/1.0 中的字段，表示资源的绝对过期时间；而 `Cache-Control` 是 HTTP/1.1 中引入的，更灵活且优先级高于 `Expires`，可以指定资源的最大缓存时间（如 `max-age=3600` 表示资源将在 3600 秒后过期）。

### 协商缓存（Negotiated Caching）

- **原理**：当资源的副本过期或浏览器的缓存被清除时，浏览器会向服务器发送请求，询问该资源是否有更新。服务器会根据资源的最后修改时间或 `ETag`（实体标签）来判断资源是否有更新。
- **实现方式**：主要依赖于 HTTP 请求头中的 `If-Modified-Since` 和 `If-None-Match` 字段，以及 HTTP 响应头中的 `Last-Modified` 和 `ETag` 字段。服务器会比较请求头中的时间戳或 ETag 值与资源当前的状态，如果资源未修改，则返回 304 Not Modified 响应，告知浏览器直接使用本地缓存。

### Service Worker 缓存 （了解即可）

- **原理**：Service Worker 是一种在浏览器后台运行的脚本，可以拦截网络请求并返回缓存的响应。通过 Service Worker，开发者可以自定义缓存策略，实现更灵活、更高效的缓存机制。
- **优势**：可以完全控制网络请求，具有最高优先级，即使是强制缓存也可以被覆盖。

### Web Storage 缓存 （了解即可）

- **包括**：localStorage 和 sessionStorage。
- **原理**：localStorage 用于存储用户在网站上的永久性数据，而 sessionStorage 则用于存储用户会话过程中的临时数据。
- **优先级**：Web Storage 缓存的优先级最低，只有在网络不可用或其他缓存都未命中时才会生效。

### 缓存机制的优势

- **提高页面加载速度**：通过减少网络请求和传输数据量，显著加快页面加载速度。
- **减少网络带宽消耗**：缓存资源可以重复使用，避免重复下载相同的资源，从而减少网络带宽的消耗。
- **降低服务器负载**：减少对服务器的请求次数，降低服务器的负载压力，提高服务器的性能和响应能力。

### 缓存机制的注意事项

- **缓存更新问题**：由于缓存的存在，用户可能无法立即获取到最新的内容。因此，需要合理设置缓存策略，确保用户能够及时获取到更新后的资源。
- **缓存一致性问题**：如果多个地方缓存了同一资源，当一个地方的资源更新时，其他地方的缓存可能仍然是旧的版本。这可能导致显示不一致的内容或功能异常。
- **缓存过期管理**：缓存需要定期更新以确保用户获取到最新的内容。过期管理可能复杂，设置不当或策略不当可能导致用户无法及时获取更新的内容。

### 浏览器资源缓存过程图

<img src="./assets/bs-cache.png" alt="浏览器资源缓存过程图" />

## 浏览器的 Cookie 你了解多少呢？（2024-08-27）

### 1、Cookie 的组成

一个 Cookie 通常包含以下信息：

- **名称（Name）**：Cookie 的唯一标识符。
- **值（Value）**：与名称相关联的数据。
- **过期时间（Expires/Max-Age）**：Cookie 的有效期，指定了 Cookie 何时应该被删除。如果未设置，则 Cookie 会在浏览器会话结束时过期（即浏览器关闭时）。
- **路径（Path）**：指定了哪些路径下的页面可以访问该 Cookie。
- **域（Domain）**：指定了哪些主机可以接受该 Cookie。
- **安全标志（Secure）**：当设置为 Secure 时，Cookie 仅通过 HTTPS 连接发送。
- **HttpOnly 标志**：当设置为 HttpOnly 时，JavaScript 脚本无法访问该 Cookie，这有助于减少跨站脚本攻击（XSS）的风险。

### 2、Cookie 的用途

- **用户认证**：存储用户的登录状态，如会话 ID。
- **个性化设置**：记住用户的偏好设置，如语言选择、主题等。
- **追踪用户行为**：用于分析用户行为，如访问页面、点击链接等，以优化网站或进行广告推送。
- **购物车**：在电子商务网站上存储用户的购物车信息。

### 3、Cookie 的限制

- **大小限制**：每个 Cookie 的大小通常限制在 4KB 左右，浏览器之间可能有所不同。
- **数量限制**：浏览器对单个域名下可以存储的 Cookie 数量有限制，通常是 20 个左右，但总大小限制更为关键。
- **隐私和安全**：Cookie 可以被第三方网站读取（如果设置了相应的域），这可能导致隐私泄露。此外，Cookie 也是跨站脚本攻击（XSS）的常见目标。

### 4、替代技术

由于 Cookie 的局限性，现代 Web 开发中还使用了其他技术来存储客户端数据，如：

- **Web Storage**（包括 LocalStorage 和 SessionStorage）：提供了更大的存储空间，并且没有数量限制，但数据存储在用户的浏览器上，可能会受到浏览器存储限制的影响。
- **IndexedDB**：一个低级的 API，用于客户端存储大量结构化数据，支持事务和查询。
- **Service Workers** 和 **Cache API**：用于在后台处理网络请求和缓存资源，提高应用性能。

### 5、管理和删除 Cookie

用户可以通过浏览器的设置来查看、修改或删除 Cookie。此外，许多浏览器还提供了隐私模式（如 Chrome 的无痕模式），在这种模式下，浏览器不会保存任何浏览历史、Cookie 或网站数据。

总的来说，Cookie 是 Web 开发中不可或缺的一部分，但开发者也需要注意其局限性，并考虑使用其他技术来补充或替代 Cookie 的功能。

<br/>
<hr />

⭐️⭐️⭐️ 好啦！！！本文章到这里就结束啦。⭐️⭐️⭐️

✿✿ ヽ(°▽°)ノ ✿

撒花 🌸🌸🌸🌸🌸🌸
