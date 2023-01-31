<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="" />
      <span class="title">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      :collapse="collapse"
      :unique-opened="true"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <!-- <el-icon v-if="item.icon" :class="item.icon"></el-icon> -->
              <el-icon><document /></el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItem(subItem)"
              >
                <!-- <i v-if="subItem.icon" :class="subItem.icon"></i> -->
                <el-icon><document /></el-icon>
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''">
            <!-- <i v-if="item.icon" :class="item.icon"></i> -->
            <el-icon><document /></el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "@/store";
import { useRouter, useRoute } from "vue-router";

import { pathMapToMenu } from "@/utils/map-menus";

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const userMenus = computed(() => store.state.login.userMenus);

    const router = useRouter();

    const route = useRoute();
    const currentPath = route.path;
    const menu = pathMapToMenu(userMenus.value, currentPath)

    const defaultActive = ref(menu.id + '');

    const handleMenuItem = (item: any) => {
      router.push({
        path: item.url ?? "/not-found",
      });
    };
    return { userMenus, handleMenuItem, defaultActive };
  },
});
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      width: 20px;
      height: 20px;
      margin: 0 10px;
      background: skyblue;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}

.el-menu {
  border-right: none;
}

.el-icon {
  background: skyblue;
}
</style>
