<template>
  <div id="home-menu" :style="styles">
    <a-menu
      theme="dark"
      mode="inline"
      :inline-collapsed="collapsed"
      :openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      @openChange="onOpenChange"
      @select="onSelect"
    >
      <template v-for="(menu, index) in menuList" :key="index">
        <a-menu-item :key="menu.path" v-if="!menu.children">
          <component :is="menu.meta.icon"></component>
          <span>{{ menu.meta.title }}</span>
        </a-menu-item>
        <a-sub-menu :key="menu.path" v-else>
          <template #title>
            <span>
              <component :is="menu.meta.icon"></component>
              <span>{{ menu.meta.title }}</span>
            </span>
          </template>
          <template v-for="(childMenu, index) in menu.children" :key="index">
            <a-menu-item :key="childMenu.path" v-if="!childMenu.children">
              <component :is="childMenu.meta.icon"></component>
              {{ childMenu.meta.title }}
            </a-menu-item>
            <a-sub-menu :key="childMenu.path" v-else>
              <template #title>
                <span>
                  <component :is="childMenu.meta.icon"></component>
                  <span>{{ childMenu.meta.title }}</span>
                </span>
              </template>
              <a-menu-item
                :key="grandChildren.path"
                v-for="grandChildren in childMenu.children"
              >
                <component :is="grandChildren.meta.icon"></component>
                {{ grandChildren.meta.title }}
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-sub-menu>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { reactive, toRefs, inject, computed, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const state = reactive({
  collapsed: false,
  rootSubmenuKeys: [],
  openKeys: [],
  selectedKeys: ['/index']
});

export default {
  setup() {
    const $router = useRouter();

    const { matched, path } = useRoute();
    state.openKeys = [matched[1]['path']];
    state.selectedKeys = [path];

    const $eventBus = inject('$eventBus');
    $eventBus.$on('isOpenMenu', e => (state.collapsed = e));

    onUnmounted(() => {
      $eventBus.$off('isOpenMenu');
    });

    const styles = computed(() => {
      const styles = {};
      state.collapsed ? (styles.width = '80px') : (styles.width = '256px');
      return styles;
    });

    const menuList = useStore().state.menus.menuList;
    menuList.map(menu => {
      state.rootSubmenuKeys.push(menu.path);
    });

    const methods = {
      onOpenChange(openKeys) {
        const latestOpenKey = openKeys.find(
          key => state.openKeys.indexOf(key) === -1
        );
        if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
          state.openKeys = openKeys;
        } else {
          state.openKeys = latestOpenKey ? [latestOpenKey] : [];
        }
      },
      onSelect({ key }) {
        $router.push(key);
      }
    };

    return {
      ...toRefs(state),
      styles,
      menuList,
      ...methods
    };
  }
};
</script>

<style lang="scss">
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background-color: #191a23;
}
</style>

<style lang="scss" scoped>
#home-menu {
  width: 256px;
  min-height: 100%;
  background-color: #191a23;
}
</style>
