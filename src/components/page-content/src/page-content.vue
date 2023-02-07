<template>
  <div class="page-content">
    <ITable :listData="userList" v-bind="contentTableConfig">
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
        />
        <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange" -->
      </template>
    </ITable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
import ITable from "@/base-ui/table";

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  components: {
    ITable,
  },
  setup(props) {
    const store = useStore();
    store.dispatch("system/getPageListAction", {
      pageName: props.pageName,
    //   pageUrl: "users/list",
      queryInfo: {
        offset: 0,
        size: 10,
      },
    });
    const userList = computed(() => store.state.system.userList);
    const userCount = computed(() => store.state.system.userCount);
    return {
      userList,
      userCount,
    };
  },
});
</script>

<style scoped>
</style>