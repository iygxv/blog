# leetcode总结

## 滑动窗口

滑动窗口题目解决思路

- 窗口内是什么？
- 窗口的起始位置如何移动？
- 窗口的结束位置如何移动？

### 举例

[209. 长度最小的子数组](https://leetcode.cn/problems/minimum-size-subarray-sum/)

- 窗口就是 满足其和 ≥ s 的长度最小的 连续 子数组。

- 窗口的起始位置如何移动：如果当前窗口的值大于s了，窗口就要向前移动了（也就是该缩小了）。

- 窗口的结束位置如何移动：窗口的结束位置就是遍历数组的指针，也就是for循环里的索引。

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  const len = nums.length
  let l = (r = sum = 0)
  res = Infinity  
  while (r < len) {
    sum += nums[r++]
    // 窗口滑动
    while (sum >= target) {
      res = res < r - l ? res : r - l
      sum -= nums[l++]
    }
  }
  return res > len ? 0 : res
}
```

