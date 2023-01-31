<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar :size="20" :src="circleUrl" />
      <span>{{ name }}</span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "@/store";
export default defineComponent({
  setup() {
    const store = useStore();
    const name = computed(() => store.state.login.userInfo.name);
    const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    return {
      name,
      circleUrl
    };
  },
});
</script>
<style scoped>
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
}
</style>
