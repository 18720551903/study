import { createStore } from 'vuex';
import menus from './modules/menus';

export default createStore({
  modules: {
    menus
  }
});
