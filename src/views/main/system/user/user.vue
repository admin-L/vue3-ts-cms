<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import PageSearch from "@/components/page-search";
import { searchFormConfig } from "./config/search.config";

export default defineComponent({
  name: "user",
  components: {
    PageSearch,
  },
  setup() {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      pageUrl: 'users/list',
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    return { searchFormConfig };
  },
});
</script>

<style scoped></style>
