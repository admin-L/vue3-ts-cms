<template>
  <div class="nav-header">
    <div class="arrow" @click="handleArrowActive">
      {{ direction === "right" ? "《--" : "--》" }}
    </div>
    <div class="content">
      <div>
        <NavBreadcrumb :breadcrumbs="breadcrumbs"></NavBreadcrumb>
      </div>
      <div>
        <UserInfo></UserInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import NavBreadcrumb, { IBreadcrumb } from "@/base-ui/breadcrumb";
import UserInfo from "./user-info.vue";

import { useStore } from "@/store";
import { useRoute } from "vue-router";
import { pathMapToBreadcrumb } from "@/utils/map-menus";

export default defineComponent({
  components: {
    NavBreadcrumb,
    UserInfo,
  },
  emits: ["arrowChange"],
  setup(props, { emit }) {
    const direction = ref("right");
    const handleArrowActive = () => {
      direction.value = direction.value === "right" ? "left" : "right";
      emit("arrowChange", direction.value);
      // console.log(direction.value)
    };
    const store = useStore();
    const route = useRoute();
    const breadcrumbs = computed(() => {
      const userMenus = store.state.login.userMenus;
      const currentPath = route.path;
      return pathMapToBreadcrumb(userMenus, currentPath);
    });

    return {
      direction,
      handleArrowActive,
      breadcrumbs,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
}
.arrow {
  // width: 20px;
  // height: 20px;
  cursor: pointer;
  padding: 2px;
}
.arrow:hover {
  background: #ccc;
}

.content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
}
</style>
