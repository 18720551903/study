<template>
  <a-config-provider :locale="locale">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import { ref } from 'vue';
export default {
  name: 'App',
  setup() {
    const locale = ref(zhCN);

    return {
      locale
    };
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  min-width: 1366px;
  min-height: 100%;
  background-color: #f5f7f9;
}
</style>
