<template>
  <div class="my-table">
    <div
      style="text-align: right; display:flex; justify-content:space-between; margin-bottom: 10px"
    >
      <div style="padding: 10px 0" class="bigger-font-14">
        <span>
          项目列表
        </span>
      </div>
      <button
        @click="handleClick"
        class="my-btn">
        添加
      </button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <slot></slot>
    </el-table>
  </div>

</template>

<script>
export default {
  name: 'index',

  props: {
    tableData: {
      required: true
      // validator: function(value) {
      //   return value >= 0
      // }
    },
    listLoading: {
      required: false,
      default: false
    }
  },
  methods: {
    handleClick() {
      this.$emit('btnClick')
    }
  }
}
</script>

<style scoped>

</style>
