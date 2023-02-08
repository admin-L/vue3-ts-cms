<template>
  <div class="goods">
    <PageContent
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
    >
      <template #image="scope">
        <el-image
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
        ></el-image>
        <!-- <span>123</span> -->
      </template>
    </PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageContent from "@/components/page-content";
import { contentTableConfig } from "./config/content.config";

import { usePageSearch } from "@/hooks/use-page-search";

export default defineComponent({
  name: "goods",
  components: {
    PageContent,
  },
  setup() {
    const pageName = "goods";
    const [pageContentRef, handleReset, handleQuery] = usePageSearch();
    return {
      contentTableConfig,
      pageName,
      // ...usePageSearch()
      pageContentRef,
      handleReset,
      handleQuery,
    };
  },
});
</script>

<style scoped></style>
