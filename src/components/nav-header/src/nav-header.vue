<template>
  <div class="nav-header">
    <div class="arrow" @click="handleArrowActive">
      {{ direction === "right" ? "《--" : "--》" }}
    </div>
    <div class="content">
      <div>面包屑</div>
      <div>
        <UserInfo></UserInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@/store";
import UserInfo from './user-info.vue'

export default defineComponent({
  components: {
    UserInfo
  },
  emits: ["arrowChange"],
  setup(props, { emit }) {
    const direction = ref("right");
    const handleArrowActive = () => {
      direction.value = direction.value === "right" ? "left" : "right";
      emit("arrowChange", direction.value);
      // console.log(direction.value)
    };
    return {
      direction,
      handleArrowActive,
    };
  },
});
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
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
  margin-left: 10px;
}
</style>
