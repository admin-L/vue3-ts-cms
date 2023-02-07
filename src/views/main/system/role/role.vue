<template>
  <div class="role">
    <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    <PageContent
      :contentTableConfig="contentTableConfig"
      :pageName="pageName"
    ></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default defineComponent({
  name: "role",
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    const pageName = "role";
    return {
      pageName,
      searchFormConfig,
      contentTableConfig,
    };
  },
});
</script>

<style scoped>
.role {
  padding: 20px;
}
</style>
