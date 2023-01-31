<template>
  <div class="login">
    <login-panel></login-panel>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginPanel from './components/login-panel.vue'

export default defineComponent({
  name: 'Login',
  components: {
    LoginPanel,
  },
})
</script>

<style scoped lang="less">
.login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
