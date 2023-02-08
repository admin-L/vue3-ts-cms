<template>
  <div class="menu">
    <PageContent :contentTableConfig="contentTableConfig" :pageName="pageName"></PageContent>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

export default defineComponent({
  name: 'menu',
  components: {
    PageContent
  },
  setup() {
    const pageName = 'menu'
    return {
      contentTableConfig,
      pageName
    }
  }
})
</script>

<style scoped>

</style>
