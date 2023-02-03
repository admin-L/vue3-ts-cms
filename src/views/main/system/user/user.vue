<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
      <el-table :data="userList" stripe style="width: 100%" border table-layout="fixed">
        <el-table-column type="index" width="100" />
        <el-table-column prop="departmentId" label="部门id" />
        <el-table-column prop="name" label="用户名" />
        <el-table-column prop="cellphone" label="手机号" />
      </el-table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
  },
  setup() {
    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageUrl: "users/list",
      queryInfo: {
        offset: 0,
        size: 10,
      },
    });
    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);
    return { searchFormConfig, userList, userCount };
  },
});
</script>

<style scoped></style>
