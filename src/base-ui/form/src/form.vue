<template>
  <div class="header">
    <slot name="header"></slot>
  </div>
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
                v-model="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                style="width: 100%"
                v-model="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
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
                v-model="modelValue[item.field]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from "vue";
import { IFormItem } from "../types";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    // formData: {
    //   type: Object,
    //   required: true,
    // },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => {
        padding: "5px 0";
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
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    // const formData = computed({
    //   get: () => props.modelValue,
    //   set: (newValue) => {
    //     // emit("update:modelValue", newValue);
    //   },
    // });
    const formData = ref({ ...props.modelValue });
    watch(
      () => props.modelValue,
      (newValue) => {
        console.log(newValue);
        formData.value = { ...props.modelValue };
      }
    );
    watch(formData, (newValue) => emit("update:modelValue", newValue), {
      deep: true,
    });

    const handleValueChange = (value: any, field: string) => {
      emit("update:modelValue", { ...props.modelValue, [field]: value });
    };
    return {
      formData,
      handleValueChange
    };
  },
});
</script>

<style scoped lang="less">
.form {
  padding-top: 22px;
  // .form-item {
  //   padding: 5px 0;
  // }
}
</style>
