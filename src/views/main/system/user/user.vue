<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </div>
    <div class="content">
      <ITable :listData="userList" :propList="propList"></ITable>
      <!-- <el-table :data="userList" stripe style="width: 100%" border>
        <template v-for="propItem in propList" :key="propItem.prop">
          <el-table-column v-bind="propItem" />
        </template>
      </el-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import ITable from '@/base-ui/table'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    ITable,
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10,
      },
    })
    const userList = computed(() => store.state.system.userList)
    const userCount = computed(() => store.state.system.userCount)

    const propList = [
      { prop: 'name', label: '用户名', minWidth: '100' },
      { prop: 'realname', label: '真实姓名', minWidth: '100' },
      { prop: 'cellphone', label: '电话号码', minWidth: '100' },
      { prop: 'enable', label: '状态', minWidth: '100' },
      { prop: 'createAt', label: '创建时间', minWidth: '250' },
      { prop: 'updateAt', label: '更新时间', minWidth: '250' },
      // { prop: 'department', label: '部门ID', minWidth: '100' },
    ]
    return { searchFormConfig, userList, userCount, propList }
  },
})
</script>

<style scoped>
.user {
  padding: 20px;
}
.content {
  margin-top: 20px;
  /* border-top: 20px solid #f0f2f5; */
}
</style>
