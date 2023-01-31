<template>
  <el-form class="form" :label-width="labelWidth">
    <el-row>
      <!-- <el-col :span="8">
        <el-form-item label="用户名">
          <el-input></el-input>
        </el-form-item>
      </el-col> -->
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                :show-password="item.type === 'password'"
                v-bind="item.otherOptions"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select :placeholder="item.placeholder" style="width: 100%">
                <el-option
                  v-bind="item.otherOptions"
                  v-for="option of item.options"
                  :key="option.value"
                  :value="option.value"
                  >{{ option.title }}</el-option
                >
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                style="width: 100%"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IFormItem } from '../types'

export default defineComponent({
  props: {
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '100px',
    },
    itemStyle: {
      type: Object,
      default: () => {
        padding: '5px 0'
      },
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
  },
  setup() {},
})
</script>

<style scoped lang="less">
.form {
  padding-top: 22px;
  // .form-item {
  //   padding: 5px 0;
  // }
}
</style>
