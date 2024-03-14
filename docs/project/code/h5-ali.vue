<template>
 <div class="pay-container">
  <div class="wx-pay" @click="handleAliPay">
    支付宝支付
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
    handleForm(form, callbackResultUrl) {
        if(callbackResultUrl) {
          // 这里必须使用encodeURIComponent编码，这里可以使用redirect_url在 url 上拼接回调地址， 这里的话最好也是跟h5 微信 支付同样的方式去处理（使用一个弹窗，来查看是否支付成功，是否去跳结果页）
          url = `${url}&redirect_url=${encodeURIComponent(callbackResultUrl)}`;
        }
				const div = document.createElement("div");
				div.innerHTML = form;
				document.body.appendChild(div);
				document.forms[0].setAttribute("target", "_self");
				document.forms[0].submit();
				div.remove();

        setTimeout(() => {
          this.isStartPay = true
        }, 1500)
        
    },
    handleAliPay() {
      // aliPay 为封装的请求，用于调起微信支付, data为参数
      aliPay(data).then((res) => {
        // 获取到 form 表单字符串， 提交表单调起支付宝支付
        const { form } = res
        this.handleForm(form)
      })
    }
  },
}
</script>