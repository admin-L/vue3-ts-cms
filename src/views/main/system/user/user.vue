<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </div>
    <div class="content">
      <ITable
        :listData="userList"
        :title="title"
        :propList="propList"
        :showIndexColumn="showIndexColumn"
        :showSelectColumn="showSelectColumn"
      >
        <template #headerHandler>
          <el-button>新建用户</el-button>
          <el-button>刷新</el-button>
        </template>
        <template #status="scope">
          <el-button
            size="small"
            :type="scope.row.enable ? 'success' : 'danger'"
            >{{ scope.row.enable ? "启用" : "禁用" }}</el-button
          >
        </template>
        <!-- <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ scope.row.updateAt }}</strong>
        </template> -->
        <template #createAt="scope">
          <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
        </template>
        <template #updateAt="scope">
          <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
        </template>
        <template #operations>
          <div class="operations-content">
            <el-button link size="small">编辑</el-button>
            <el-button link size="small">删除</el-button>
          </div>
        </template>
        <template #footer>
          <!-- v-model:current-page="currentPage4"
            v-model:page-size="pageSize4" -->
          <el-pagination
            :page-sizes="[10, 20, 30, 40]"
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="userCount"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </template>
      </ITable>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { useStore } from "@/store";
import PageSearch from "@/components/page-search";
import ITable from "@/base-ui/table";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    ITable,
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

    const title = "用户列表";

    const propList = [
      { prop: "name", label: "用户名", minWidth: "100" },
      { prop: "realname", label: "真实姓名", minWidth: "100" },
      { prop: "cellphone", label: "电话号码", minWidth: "100" },
      { prop: "enable", label: "状态", minWidth: "100", slotName: "status" },
      {
        prop: "createAt",
        label: "创建时间",
        minWidth: "250",
        slotName: "createAt",
      },
      {
        prop: "updateAt",
        label: "更新时间",
        minWidth: "250",
        slotName: "updateAt",
      },
      { label: "操作", minWidth: "120", slotName: "operations" },
      // { prop: 'department', label: '部门ID', minWidth: '100' },
    ];
    const showIndexColumn = true;
    const showSelectColumn = true;

    const handleSizeChange = (val: number) => {
      console.log(val);
    };
    const handleCurrentChange = (val: number) => {
      console.log(val);
    };

    return {
      searchFormConfig,
      userList,
      userCount,
      title,
      propList,
      showIndexColumn,
      showSelectColumn,
      handleSizeChange,
      handleCurrentChange,
    };
  },
});
</script>

<style scoped>
.user {
  padding: 20px;
}
.content {
  margin-top: 20px;
  /* border-top: 20px solid #f0f2f5; */
}
.operations-content {
  display: flex;
}
</style>
