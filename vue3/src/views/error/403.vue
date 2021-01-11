<template>
  <div class="exception">
    <div class="img">
      <img
        src="https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg"
      />
    </div>
    <div class="content">
      <h1>403</h1>
      <div class="desc">抱歉，你无权访问该页面</div>
      <div class="action">
        <a-button @click="$router.push('/')" type="primary">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Err403'
};
</script>

<style lang="scss" scoped>
@import '~assets/scss/error.scss';
</style>
