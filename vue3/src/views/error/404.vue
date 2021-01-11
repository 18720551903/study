<template>
  <div class="exception">
    <div class="img">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg"
      />
    </div>
    <div class="content">
      <h1>404</h1>
      <div class="desc">抱歉，你要找的页面飞走了</div>
      <div class="action">
        <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Err404'
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/error.scss';
</style>
