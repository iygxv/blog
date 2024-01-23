<template>
 <div class="pay-container">
  <div class="wx-pay" @click="handleWxPay">
    微信支付
  </div>

  <!-- 用户去点击按钮触发查单操作，回跳页面 -->
  <!-- 这里是一个弹窗 -->
 </div>
</template>

<script>
export default {
  data() {
    return {
      isStartPay: false
    }
  },
  methods: {
    handleWxUrl(url, callbackResultUrl) {
        if(callbackResultUrl) {
          // 这里必须使用encodeURIComponent编码， 微信要求， 这里可以使用redirect_url在 url 上拼接回调地址， 但是这里会有问题，我们下面说
          url = `${url}&redirect_url=${encodeURIComponent(callbackResultUrl)}`;
        }
				var form = document.createElement('form');
				document.body.appendChild(form);
				form.method = "post";
				form.action = url;
				form.submit();
				document.body.removeChild(form);

        setTimeout(() => {
          this.isStartPay = true
        }, 1500)
        
    },
    handleWxPay() {
      // wxPay 为封装的请求，用于调起微信支付, data为参数
      wxPay(data).then((res) => {
        // 获取到 调起微信支付 url
        const { url } = res
        this.handleWxUrl(url)
      })
    }
  },
}
</script>