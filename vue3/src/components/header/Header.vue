<template>
  <div id="header-wrap">
    <div id="header">
      <a-row type="flex" style="height: 100%">
        <a-col class="l logo-wrap">
          <div class="logo">
            <img
              src="https://v3.cn.vuejs.org/logo.png"
              alt="logo"
              title="logo"
            />
          </div>
          <h1 class="title">vue3-admin</h1>
        </a-col>
        <a-col class="r">
          <a-row type="flex" justify="space-between" style="height: 100%">
            <a-col class="utils">
              <span class="icon menu-on-off" @click="toggleCollapsed">
                <MenuUnfoldOutlined v-if="collapsed" />
                <MenuFoldOutlined v-else />
              </span>
              <span class="icon refresh">
                <ReloadOutlined />
              </span>
              <span class="icon bread-crumb">
                <a-breadcrumb>
                  <a-breadcrumb-item
                    v-for="(route, index) in matched"
                    :key="route.path"
                  >
                    <span
                      :class="
                        index === matched.length - 1 ? 'text-active' : 'text'
                      "
                    >
                      {{ route.meta.title }}</span
                    >
                  </a-breadcrumb-item>
                </a-breadcrumb>
              </span>
            </a-col>
            <a-col class="setting">
              <span class="icon screen">
                <FullscreenOutlined v-if="true" />
                <FullscreenExitOutlined v-else />
              </span>
              <a-badge class="message-wrap" :count="1">
                <span class="icon message">
                  <a-dropdown placement="bottomCenter" :trigger="['click']">
                    <BellOutlined />
                    <template #overlay>
                      <MessageBox></MessageBox>
                    </template>
                  </a-dropdown>
                </span>
              </a-badge>
              <a-dropdown>
                <span class="user-info">
                  <a-avatar
                    class="user-img"
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                  />
                  <span class="user-name">Kevin</span>
                  <DownOutlined style="color: #fff" />
                </span>
                <template #overlay>
                  <a-menu style="margin-top: 18px">
                    <a-menu-item>
                      <span><SettingOutlined /></span>
                      <span>设置</span>
                    </a-menu-item>
                    <a-divider style="margin: 0.1rem 0" />
                    <a-menu-item>
                      <span><LogoutOutlined /></span>
                      <span>登出</span>
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import { ref, unref, inject } from 'vue';
import { useRoute } from 'vue-router';
import MessageBox from 'components/message-box/MessageBox.vue';

export default {
  name: 'Header',
  components: {
    MessageBox
  },
  setup() {
    const $eventBus = inject('$eventBus');
    const collapsed = ref(false);

    const { matched } = useRoute();

    const methods = {
      toggleCollapsed() {
        collapsed.value = !unref(collapsed);
        $eventBus.$emit('isOpenMenu', unref(collapsed));
      }
    };

    return {
      collapsed,
      matched,
      ...methods
    };
  }
};
</script>

<style lang="scss" scoped>
#header-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  #header {
    width: 100%;
    height: 64px;
    background-color: #191a23;
    .icon {
      color: #fff;
      font-size: 24px;
      cursor: pointer;
    }
    .logo-wrap {
      display: flex;
      width: 256px;
      justify-content: center;
      align-items: center;
      .logo {
        width: 30px;
        height: 30px;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
      .title {
        color: #fff;
        font-size: 20px;
        margin: 0 10px;
      }
    }
    .r {
      width: calc(100% - 256px);
      .utils {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /deep/.ant-breadcrumb-separator {
          color: #999;
        }
        .text {
          color: #999;
        }
        .text-active {
          color: #fff;
        }
        .refresh {
          @include ml(20);
        }
        .bread-crumb {
          @include ml(20);
        }
      }
      .setting {
        display: flex;
        align-items: center;
        padding-right: 30px;
        .screen {
          @include mr(20);
        }
        .message-wrap {
          @include mr(20);
          position: relative;
        }
        .user-info {
          cursor: pointer;
          .user-name {
            font-size: 18px;
            @include ml();
            color: #fff;
          }
        }
      }
    }
  }
}
</style>
