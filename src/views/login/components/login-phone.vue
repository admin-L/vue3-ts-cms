<template>
  <div class="login-phone">
    <el-form ref="ruleFormRef" :model="phone" :rules="rules">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="phone.number"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="verifyCode">
        <div class="code-box">
          <el-input v-model="phone.password"></el-input>
          <el-button type="primary">获取验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  name: 'LoginPhone',
  setup() {
    const phone = reactive({
      number: '',
      password: '',
    })
    const rules = reactive({
      phone: [{}],
      password: [{}],
    })
    return {
      phone,
      rules,
    }
  },
})
</script>

<style scoped lang="less">
.code-box {
  display: flex;
}
</style>
