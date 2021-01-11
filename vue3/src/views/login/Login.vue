<template>
  <div id="login">
    <a-form class="wrap" :labelCol="labelCol" :wrapperCol="wrapperCol">
      <a-form-item label="账号" v-bind="validateInfos.username">
        <a-input
          id="username"
          v-model:value="form.username"
          @blur="validate('username', { trigger: 'blur' }).catch(() => {})"
        >
          <template #addonBefore>
            <UserOutlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item label="密码" v-bind="validateInfos.password">
        <a-input-password
          id="password"
          v-model:value="form.password"
          @blur="validate('password', { trigger: 'blur' }).catch(() => {})"
        >
          <template #addonBefore>
            <LockOutlined />
          </template>
        </a-input-password>
      </a-form-item>
      <a-form-item label="验证码" v-bind="validateInfos.code">
        <a-row type="flex" justify="space-between">
          <a-input
            id="code"
            style="width: 150px"
            v-model:value="form.code"
            @blur="validate('code', { trigger: 'blur' }).catch(() => {})"
          >
          </a-input>
          <a-button type="primary" @click="openCountDown">
            <template v-if="!code.codeOnOff">获取验证码</template>
            <template v-else>{{ code.count }} s</template>
          </a-button>
        </a-row>
      </a-form-item>
      <a-row type="flex" justify="end">
        <a-col pull="1">
          <a-button type="primary" @click="submit">登录</a-button>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { reactive, toRaw } from 'vue';
import { useForm } from '@ant-design-vue/use';

const validateCode = (rules, value) => {
  if (!value) {
    return Promise.reject('请输入验证码');
  }
  if (!/^\d{6}$/.test(value)) {
    return Promise.reject('验证码为六位数字');
  } else {
    return Promise.resolve();
  }
};

const code = reactive({
  count: 60,
  codeOnOff: false
});

const form = reactive({
  username: '',
  password: '',
  code: ''
});

const rules = reactive({
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ],
  code: [
    {
      validator: validateCode,
      required: true,
      trigger: 'blur'
    }
  ]
});

export default {
  name: 'Login',
  setup() {
    const login = () => {
      console.log(toRaw(form));
    };
    const { validate, validateInfos } = useForm(form, rules);
    const methods = {
      submit(e) {
        e.preventDefault();
        validate()
          .then(() => {
            login();
          })
          .catch(err => {
            console.log(err);
          });
      },
      validate,
      openCountDown() {
        if (code.codeOnOff) return;
        code.codeOnOff = true;
        const timer = setInterval(() => {
          if (code.count === 1) {
            code.count = 60;
            code.codeOnOff = false;
            clearInterval(timer);
          }
          code.count = --code.count;
        }, 1000);
      }
    };

    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 19 },
      form,
      rules,
      validateInfos,
      code,
      ...methods
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: url('~@/assets/login-bg.jpg') no-repeat;
  .wrap {
    min-width: 430px;
    min-height: 300px;
    background-color: #fff;
    margin-right: 200px;
    padding: 30px;
    border-radius: 8px;
  }
}
</style>
