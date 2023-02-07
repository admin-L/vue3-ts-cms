<template>
  <div class="page-search">
    <IForm v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h2>高级查询</h2>
      </template>
      <template #footer>
        <div style="text-align: right">
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </template>
    </IForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import IForm from "@/base-ui/form";

export default defineComponent({
  name: "user",
  props: {
    searchFormConfig: {
      type: Object,
      require: true,
    },
  },
  components: {
    IForm,
  },
  emits: ['reset', 'query'],
  setup(props, { emit }) {
    const formItems = props.searchFormConfig?.formItem ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    // console.log(formItems)
    const formData = ref(formOriginData);

    const handleQuery = () => {
      emit('query', formData.value)
    }

    const handleReset = () => {
      // console.log(formOriginData)
      // formData.value = formOriginData
      formData.value = formOriginData
      emit('reset')
    }
    return { formData, handleQuery, handleReset };
  },
});
</script>

<style scoped>
.page-search {
  margin-bottom: 22px;
}
</style>
