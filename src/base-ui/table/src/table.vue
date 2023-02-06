<template>
  <div class="table">
    <el-table
      :data="listData"
      stripe
      style="width: 100%"
      border
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
        <el-table-column v-bind="propItem" align="center">
          <template #default="scope">
            <!-- <el-button>{{ scope.row[propItem.prop] }}</el-button> -->
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    listData: {
      type: Array,
      required: true,
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
  },
  setup() {
    // const handleScope = (scope: any) => {
    //   console.log(scope)
    // }
    const handleSelectionChange = (value: any) => {
      console.log(value);
    };
    return {
      handleSelectionChange,
      // handleScope,
    };
  },
});
</script>
