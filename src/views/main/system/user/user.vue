<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
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
