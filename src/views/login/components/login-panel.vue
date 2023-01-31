<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <el-tabs type="border-card" class="tabs" stretch v-model="currentTab">
      <el-tab-pane name="account" label="账号登录">
        <login-account ref="accountRef"></login-account>
      </el-tab-pane>
      <el-tab-pane name="phone" label="手机登录">
        <LoginPhone></LoginPhone>
      </el-tab-pane>
    </el-tabs>
    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" @click="handleLogin"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  name: 'LoginPanel',
  components: {
    LoginAccount,
    LoginPhone,
  },
  setup() {
    const currentTab = ref<string>('account')
    const isKeepPassword = ref(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const handleLogin = () => {
      if (currentTab.value === 'account') {
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('手机登录')
      }
    }
    return {
      currentTab,
      isKeepPassword,
      accountRef,
      handleLogin,
    }
  },
})
</script>

<style scoped lang="less">
.tabs {
  width: 300px;
}

.account-control {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.login-btn {
  width: 100%;
}
</style>
