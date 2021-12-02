<template>
  <div id="board" class="message-container">
    <div class="box" />
    <div class="box" />
    <div class="box" />
    <div class="box" />
    <div class="box" />
    <div class="box" />
    <div class="box" />
    <div class="box" />
  </div>

</template>

<script>

let resizeDetector = require('element-resize-detector')

export default {
  name: 'Index',

  data() {
    return {

    }
  },
  mounted() {
    const resizer = resizeDetector()
    const that = this
    resizer.listenTo(document.querySelector('#board'), function() {
      that.$nextTick(function() {
        console.log("hello")
      })
    })
  },
  watch: {
    boardWidth() {
      this.reLayout()
    }
  },
  methods: {
    reLayout() {
      debugger
      console.log('relayout')
    }
  }
}
</script>

<style scoped>
.message-container {
  width: 100%;
  background-color: #6fce7f;
}

.box {
  width: 360px;
  height: 240px;
  border: 1px solid #f3f67d;
  background-color: #409EFF;
  display: inline-block;
}
</style>
