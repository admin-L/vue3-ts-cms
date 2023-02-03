<template>
  <div class="table">
    <el-table :data="listData" stripe style="width: 100%" border>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem" />
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
  setup() {},
})
</script>
