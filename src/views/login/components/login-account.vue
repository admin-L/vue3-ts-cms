<template>
  <div class="login-account">
    <el-form
      ref="formRef"
      :model="account"
      status-icon
      :rules="rules"
      class="ruleForm"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" type="password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import type { FormInstance } from 'element-plus'
import localCache from '@/utils/cache'

export default defineComponent({
  // name: 'LoginAccount',
  setup() {
    const store = useStore()
    const formRef = ref<FormInstance>()

    const nameValidate = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入账号！'))
      } else {
        callback()
      }
    }
    const passwordValidate = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入密码！'))
      } else {
        callback()
      }
    }

    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? '',
    })

    const rules = reactive({
      name: [{ required: true, validator: nameValidate, trigger: 'blur' }],
      password: [
        { required: true, validator: passwordValidate, trigger: 'blur' },
      ],
    })

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isKeepPassword) {
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          store.dispatch('login/accountLoginAction', { ...account })
        } else {
          return false
        }
      })
    }
    return {
      account,
      rules,
      formRef,
      loginAction,
    }
  },
})
</script>

<style scoped lang="less"></style>
