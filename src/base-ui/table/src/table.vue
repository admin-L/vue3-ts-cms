<template>
  <div class="table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      border
      v-model:page="pageInfo"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="80"
        label="序号"
        align="center"
      />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" align="center" show-overflow-tooltip>
          <template #default="scope">
            <!-- <el-button>{{ scope.row[propItem.prop] }}</el-button> -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :page-sizes="[10, 20, 30]"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    listData: {
      type: Array,
      required: true,
    },
    listCount: {
      type: Number,
      default: 0,
    },
    propList: {
      type: Array,
      required: true,
    },
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    page: {
      type: Object,
      default: () => ({ currentPage: 0, pageSize: 10 }),
    },
  },
  setup(props, { emit }) {
    // const handleScope = (scope: any) => {
    //   console.log(scope)
    // }
    const handleSelectionChange = (value: any) => {
      console.log(value);
    };

    const handleCurrentChange = (currentPage: number) => {
      emit("update:page", { ...props.page, currentPage });
    };

    const handleSizeChange = (pageSize: number) => {
      emit("update:page", { ...props.page, pageSize });
    };

    return {
      handleSelectionChange,
      handleCurrentChange,
      handleSizeChange
      // handleScope,
    };
  },
});
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 6px;
}
</style>
