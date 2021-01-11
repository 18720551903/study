import { App } from 'vue';
import eventBus from '@/plugins/event-bus';
import http from '@/plugins/axios';

const pluginCtx = { eventBus, http };

export default {
  install(app: App<Element>) {
    Object.keys(pluginCtx).map(ctx => {
      app.config.globalProperties[`$${ctx}`] = pluginCtx[ctx];
      app.provide(`$${ctx}`, pluginCtx[ctx]);
    });
  }
};
