<template>
  <div class="page-search">
    <IForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级查询</h2>
      </template>
      <template #footer>
        <div style="text-align: right">
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </div>
      </template>
    </IForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import IForm from '@/base-ui/form'

export default defineComponent({
  name: 'user',
  props: {
    searchFormConfig: {
      type: Object,
      require: true,
    },
  },
  components: {
    IForm,
  },
  setup() {
    const formData = ref({
      id: '',
      name: '',
      password: '',
      sport: '',
      createTime: '',
    })
    return { formData }
  },
})
</script>

<style scoped></style>
