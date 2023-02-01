<template>
  <div class="user">
    <div class="search">
      <PageSearch :searchFormConfig="searchFormConfig"></PageSearch>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
  },
  setup() {
    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: '',
    // })
    return { searchFormConfig }
  },
})
</script>

<style scoped></style>
