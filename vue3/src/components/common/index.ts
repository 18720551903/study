import { App } from 'vue';
import {
  Row,
  Col,
  Card,
  Spin,
  Tabs,
  Button,
  Input,
  Select,
  Checkbox,
  Switch,
  Upload,
  Form,
  Table,
  Pagination,
  message,
  Modal,
  Menu,
  Breadcrumb,
  Dropdown,
  Badge,
  ConfigProvider,
  Avatar,
  Divider
} from 'ant-design-vue';
import * as antIcons from '@ant-design/icons-vue';

export default {
  install(app: App<Element>) {
    const antCom = [
      Row,
      Col,
      Card,
      Spin,
      Tabs,
      Button,
      Input,
      Select,
      Checkbox,
      Upload,
      Switch,
      Form,
      Table,
      Modal,
      Pagination,
      Menu,
      Breadcrumb,
      Dropdown,
      Badge,
      ConfigProvider,
      Avatar,
      Divider
    ];
    const antCtx = { message, Modal };

    // 注册全局ant组件
    antCom.map(com => {
      app.use(com);
    });

    // 挂载实例原型上
    Object.keys(antCtx).map(ctx => {
      app.config.globalProperties[`$${ctx}`] = antCtx[ctx];
      app.provide(`$${ctx}`, antCtx[ctx]);
    });

    Object.keys(antIcons).map(ant => {
      app.component(ant, antIcons[ant]);
    });
  }
};
