<template>
  <div class="exception">
    <div class="img">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg"
      />
    </div>
    <div class="content">
      <h1>500</h1>
      <div class="desc">抱歉，服务器出错</div>
      <div class="action">
        <a-button type="primary" @click="$router.push('/')">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Err500'
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/error.scss';
</style>
