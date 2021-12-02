<template>
  <div class="app-container">
    <my-page-header title="任务详情"/>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import OperationGroup from '@/components/OperationGroup'
import MyPageHeader from '@/components/MyPageHeader'

export default {
  name: 'member',
  components: {
    MyTable,
    MyInput,
    OperationGroup,
    MyPageHeader
  }

}
</script>

<style scoped>

</style>
