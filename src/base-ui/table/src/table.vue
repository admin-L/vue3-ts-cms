<template>
  <div class="table">
    <el-table :data="listData" stripe style="width: 100%" border>
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
import { defineComponent } from 'vue'

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
  },
  setup() {
    // const handleScope = (scope: any) => {
    //   console.log(scope)
    // }
    return {
      // handleScope,
    }
  },
})
</script>
