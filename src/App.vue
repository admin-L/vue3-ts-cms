<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<script>
import { defineComponent } from "vue";

import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";

export default defineComponent({
  name: "App",
  components: {
    ElConfigProvider,
  },
  props: {
    name: {
      type: String,
    },
  },
  setup() {
    return {
      zhCn,
    };
  },
});
</script>


<style lang="less"></style>
