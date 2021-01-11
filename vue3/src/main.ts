import { createApp, App } from 'vue';
import AppComponent from './App.vue';
import router from './router';
import store from './store';
import 'normalize.css';
import antComponents from '@/components/common/index';
import autoRem from '@/plugins/auto-computed';
import plugins from '@/plugins/index';

const app = createApp(AppComponent);

app
  .use(antComponents)
  .use(plugins)
  .use(autoRem, { minWidth: 1920 })
  .use(store)
  .use(router)
  .mount('#app');

declare const window: Window & { $app: App<Element> };
window.$app = app;
