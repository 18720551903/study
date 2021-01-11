<template>
  <div id="index-wrap">
    <div id="index">
      <a-spin :spinning="spinning">
        <a-card title="打包文件">
          <a-form
            :label-col="labelCol"
            :wrapper-col="wrapperCol"
            :model="form"
            :rules="rules"
          >
            <a-form-item
              label="请选择项目"
              name="name"
              v-bind="validateInfos.name"
            >
              <a-select
                style="width: 200px"
                placeholder="请输入"
                v-model:value="form.name"
              >
                <a-select-option
                  :value="item.name"
                  v-for="(item, index) in projectList"
                  :key="index"
                >
                  {{ item.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item label="项目类型" name="type">
              <a-input
                disabled
                style="width: 120px"
                v-model:value="form.type"
              ></a-input>
            </a-form-item>
            <a-form-item
              label="请输入版本号"
              name="tag"
              v-bind="validateInfos.tag"
            >
              <a-input
                style="width: 120px"
                v-model:value="form.tag"
                @blur="validate('tag', { trigger: 'blur' }).catch(() => {})"
              ></a-input>
            </a-form-item>
            <a-form-item label="是否使用tingyun探针" name="tingyun">
              <a-switch v-model:checked="form.tingyun"></a-switch>
            </a-form-item>
            <a-row>
              <a-col span="14" offset="2">
                <a-tabs
                  tab-position="left"
                  style="position: relative;left: -18px"
                >
                  <a-tab-pane key="1" tab="上传文件">
                    <div style="height: 70px">
                      <a-upload
                        name="file"
                        :customRequest="customRequest"
                        v-model:fileList="fileList"
                      >
                        <a-button> <upload-outlined /> 点击上传 </a-button>
                      </a-upload>
                    </div>
                    <p
                      v-if="form.fileUrl"
                      style="cursor: pointer"
                      @click="copyCode"
                      class="copy"
                      :data-clipboard-text="form.fileUrl"
                    >
                      <span>
                        复制上传地址:
                      </span>
                      {{ form.fileUrl }}
                    </p>
                  </a-tab-pane>
                  <a-tab-pane key="2" tab="手动输入">
                    <a-input
                      placeholder="请输入url地址"
                      style="width: 500px"
                      v-model:value="form.fileUrl"
                    ></a-input>
                  </a-tab-pane>
                </a-tabs>
              </a-col>
            </a-row>
            <a-row style="padding-top: 15px">
              <a-col push="4">
                <a-button type="primary" @click="submit">部署</a-button>
                <a-button
                  @click="resetFields(), (fileList = [])"
                  style="margin-left: 20px"
                >
                  重置
                </a-button>
              </a-col>
            </a-row>
          </a-form>
          <div class="history">
            <a-card title="历史版本记录">
              <a-row type="flex" justify="end" style="margin-bottom: 10px">
                <a-button type="primary" @click="del(true)">批量删除</a-button>
              </a-row>
              <a-table
                :columns="columns"
                :data-source="history"
                bordered
                :row-selection="{
                  selectedRowKeys: selectedRowKeys,
                  onChange: onSelectChange
                }"
              >
                <template #action>
                  <a-button type="danger" size="small" @click="del(false)">
                    删除
                  </a-button>
                </template>
              </a-table>
            </a-card>
          </div>
        </a-card>
      </a-spin>
    </div>
  </div>
</template>

<script>
import { inject, reactive, toRefs, watchEffect } from 'vue';
import {
  getProjectList,
  uploadUrl,
  buildImage,
  getTagHistory
} from 'apis/index';
import { useForm } from '@ant-design-vue/use';
import ClipboardJS from 'clipboard';

const rules = {
  name: [{ required: true, message: '项目名不能为空', trigger: 'blur' }],
  tag: [{ required: true, message: '版本号不能为空', trigger: 'blur' }]
};

const state = reactive({
  projectList: [],
  selectArr: [],
  spinning: false,
  fileList: [],
  history: [
    {
      key: 1,
      tag: '1.9.2'
    },
    {
      key: 2,
      tag: '1.9.2'
    },
    {
      key: 3,
      tag: '1.9.2'
    },
    {
      key: 4,
      tag: '1.9.2'
    }
  ],
  form: {
    projectId: undefined,
    name: '',
    tag: '',
    type: '',
    tingyun: true,
    fileUrl: ''
  }
});

const columns = [
  {
    title: '版本号',
    dataIndex: 'tag',
    key: 'tag',
    align: 'center'
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    align: 'center',
    slots: {
      customRender: 'action'
    }
  }
];

export default {
  name: 'Index',
  setup() {
    const $message = inject('$message');
    const { resetFields, validate, validateInfos } = useForm(state.form, rules);
    const methods = {
      validate,
      validateInfos,
      resetFields,
      copyCode() {
        const clipboard = new ClipboardJS('.copy');
        clipboard.on('success', () => {
          $message.success('复制成功');
        });
        clipboard.on('error', () => {
          $message.success('复制失败');
        });
      },
      del(boo) {
        console.log(boo);
      },
      onSelectChange(selectedRowKeys, selectedRows) {
        state.selectArr = selectedRows;
      },
      submit() {
        validate()
          .then(() => {
            if (!state.form.fileUrl) return $message.error('文件地址必填');
            methods.buildImage();
          })
          .catch(() => {
            $message.error('请确保填写无误后，再次提交!');
          });
      },
      async customRequest({ file, onSuccess, onProgress }) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('output', 'json2');

        const { status, data, message } = await uploadUrl(formData);

        if (status !== 'ok') return $message.error(message);
        onSuccess(data, file);
        onProgress({ percent: 100 });
        state.form.fileUrl = data.url;

        // const progress = { percent: 1 };
        // const speed = 100 / (file.size / 65000); //上传速度
        // const intervalId = setInterval(() => {
        //   // 控制进度条防止在未上传成功时进度条达到100
        //   if (progress.percent < 99 && progress.percent + speed < 100) {
        //     progress.percent += speed; //控制进度条速度
        //     onProgress(progress); //onProgress接收一个对象{ percent: 进度 }在进度条上显示
        //   } else if (progress.percent === 99) {
        //     progress.percent++;
        //   } else if (progress.percent === 100) {
        //     clearInterval(intervalId);
        //   }
        // }, 100);
      },
      async getProjectList() {
        const { success, data } = await getProjectList();

        if (success) {
          data.map(record => (record.key = record.id));

          state.projectList = data;
        }
      },
      async buildImage() {
        state.spinning = true;
        const params = {};
        params.type = state.form.type === '前端' ? 2 : 1;

        try {
          const { success, message } = await buildImage(
            Object.assign({}, state.form, params)
          );
          state.spinning = false;

          if (success) {
            $message.success('部署成功');
            resetFields();
            state.fileList = [];
          } else {
            $message.error(message);
          }
        } catch {
          $message.error('部署失败');
          state.spinning = false;
        }
      },
      async getTagHistory() {
        const { success, data } = await getTagHistory(state.form.projectId);

        if (success) {
          state.history = data;
        }
      }
    };
    const init = () => {
      methods.getProjectList();
    };

    watchEffect(() => {
      const target = state.projectList.find(
        record => record.name === state.form.name
      );
      if (target) {
        const map = new Map([
          [1, '后端'],
          [2, '前端']
        ]);

        state.form.projectId = target.id;
        state.form.type = map.get(target.type);

        methods.getTagHistory();
      }
    });

    init();

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      columns,
      rules,
      ...methods,
      ...toRefs(state)
    };
  }
};
</script>

<style lang="scss" scoped>
#index-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  #index {
    width: 1200px;
    .history {
      width: 300px;
      position: absolute;
      z-index: 999;
      top: 80px;
      left: 800px;
    }
  }
}
</style>
