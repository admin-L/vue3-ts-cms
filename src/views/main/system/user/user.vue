<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig" @reset="handleReset" @query="handleQuery"></PageSearch>
    </div>
    <div class="content">
      <PageContent ref="pageContentRef" :contentTableConfig="contentTableConfig" :pageName="pageName"></PageContent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
    PageContent,
  },
  setup() {

    const pageContentRef = ref<InstanceType<typeof PageContent>>()

    const pageName = 'users'

    const handleReset = () => {
      pageContentRef.value?.getPageData()
    }
    const handleQuery = (params: any) => {
      pageContentRef.value?.getPageData(params)
    }

    return {
      pageName,
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleReset,
      handleQuery
    };
  },
});
</script>

<style scoped>
.user {
  padding: 20px;
}

.content {
  margin-top: 20px;
  /* border-top: 20px solid #f0f2f5; */
}

.operations-content {
  display: flex;
}
</style>
