<template>
  <div class="page-content">
    <ITable
      :listData="dataList"
      v-bind="contentTableConfig"
      :listCount="dataCount"
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
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.propName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <template #footer>
        <el-pagination
          :page-sizes="[10, 20, 30, 40]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
        />
      </template>
    </ITable>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
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
    const pageInfo = ref({ currentPage: 0, pageSize: 10 });
    watch(pageInfo, () => getPageData());
    const getPageData = (params: any = {}) => {
      console.log(params);
      store.dispatch("system/getPageListAction", {
        pageName: props.pageName,
        //   pageUrl: "users/list",
        queryInfo: {
          offset: pageInfo.value.currentPage * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...params,
        },
      });
    };
    getPageData();
    const dataList = computed(() =>
      store.getters["system/pageListData"](props.pageName)
    );
    const dataCount = computed(() =>
      store.getters["system/pageListCount"](props.pageName)
    );
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        if (item.slotName === "status") return false;
        if (item.slotName === "createAt") return false;
        if (item.slotName === "updateAt") return false;
        if (item.slotName === "operations") return false;
        return true;
      }
    );
    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
    };
  },
});
</script>

<style scoped>
.product-img {
  height: 50px;
}
</style>