import {ref} from 'vue'
import PageContent from '@/components/page-content'

export function usePageSearch() {
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  const handleReset = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQuery = (params: any) => {
    pageContentRef.value?.getPageData(params)
  }
  return [pageContentRef, handleReset, handleQuery]
}