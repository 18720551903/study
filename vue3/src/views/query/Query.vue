<template>
  <div id="query-wrap">
    <div id="query">
      <a-row type="flex" justify="end" style="margin-bottom: 15px">
        <a-button type="primary" @click="visible = true">新增</a-button>
      </a-row>
      <a-table :columns="columns" :data-source="data" bordered>
        <template #operation>
          <a-button type="danger" size="small">删除</a-button>
        </template>
      </a-table>
      <a-modal title="新增" v-model:visible="visible">
        <p>这是model</p>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { getProjectList } from 'apis/index';
import { reactive, toRefs } from 'vue';

const state = reactive({
  data: [],
  visible: false
});

const columns = [
  {
    title: '项目名',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '项目类型',
    dataIndex: 'type',
    key: 'type',
    align: 'center',
    customRender: ({ text }) => {
      const map = new Map([
        [1, '后端'],
        [2, '前端']
      ]);
      return map.get(text);
    }
  },
  {
    title: '浪潮镜像名称',
    dataIndex: 'imageName',
    key: 'imageName',
    align: 'center'
  },
  {
    title: '浪潮应用实例名称',
    dataIndex: 'instanceName',
    key: 'instanceName',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    align: 'center',
    slots: {
      customRender: 'operation'
    }
  }
];

export default {
  name: 'Home',
  setup() {
    const methods = {
      async getProjectList() {
        const { success, data } = await getProjectList();

        if (success) {
          data.map(record => (record.key = record.id));

          state.data = data;
        }
      }
    };

    const init = () => {
      methods.getProjectList();
    };

    init();

    return {
      columns,
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
#query-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  #query {
    width: 1200px;
  }
}
</style>
