import { SET_MENUS } from '@/store/mutation-types';

export default {
  namespaced: true,
  state: {
    menuList: null
  },
  mutations: {
    [SET_MENUS](
      state: { menuList: null | Array<object> },
      payload: Array<object>
    ) {
      state.menuList = payload[0]['children'];
    }
  }
};
