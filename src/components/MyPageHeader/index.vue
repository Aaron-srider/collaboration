<template>
  <div class="page-header">
    <h5 class="header-title title-font-16">
      {{this.title}}
    </h5>
  </div>
</template>

<script>
export default {
  name: 'index',
  props: {
    title: {
      required: true,
      default: 'header title'
    }
  }
}
</script>

<style scoped>

/*div*/
.page-header {
  /*background-color: red;*/
  height: 60px;
  margin-bottom: 20px;
  padding: 21px 0;
  border-bottom: 1px solid #e6ebef;
}

/*h5*/
.header-title {
  margin: 0;
  border-left: 3px solid #00c1de;
  height: 20px;
  text-indent: 8px;
  font-size: 16px;
  padding: 2px 0;
}

</style>
