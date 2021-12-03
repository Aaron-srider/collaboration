<template>

  <div class="app-container">
    <my-page-header title="我的留言"/>
    <div id="board" class="message-container">
      <div v-for='item in [1,1,1,1,1,1,1,1,1,1,1]' class="box">
        <el-card class="box-card">
          <div class="message-title">
            <span>文超</span>
            <span class="split-line">|</span>
            <span>2019027283</span>
          </div>
          <div class="message-content">
            <p>
              The official guide assumes intermediate level knowledge of HTML, CSS, and JavaScript. If you are totally
              new
              to frontend development, it might not be the best idea to jump right into a framework as your first step -
              grasp the basics then come back! Prior experience with other frameworks helps, but is not required.
            </p>
          </div>
          <div class="message-footer">
            <span>2021-02-09</span>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>

import MyTable from "@/components/MyTable";
import MyInput from "@/components/MyInput";
import OperationGroup from "@/components/OperationGroup";
import MyPageHeader from "@/components/MyPageHeader";

let resizeDetector = require('element-resize-detector')

export default {
  name: 'Index',
  components: {
    MyTable,
    MyInput,
    OperationGroup,
    MyPageHeader
  },
  data() {
    return {}
  },
  mounted() {
    const resizer = resizeDetector()
    let that = this

    resizer.listenTo(document.querySelector('#board'), function () {
      that.$nextTick(() => {
        that.reLayout()
      })
    })
  },
  methods: {
    reLayout() {
      const boardWidth = document.querySelector('#board').clientWidth
      console.log(boardWidth)
      const minCardWidth = 350

      console.log('================')
      const cardNumInOneRow = Math.floor(boardWidth / minCardWidth)
      console.log(cardNumInOneRow)

      const restWidth = boardWidth % minCardWidth
      console.log(restWidth)

      if (restWidth > 0) {

        const actualCardWidth = (boardWidth / cardNumInOneRow) - 2
        console.log(actualCardWidth)
        console.log('================')
        const boxs = document.getElementsByClassName('box')

        // console.log( boxs)
        for (const box of boxs) {
          // console.log(box.style.width)
          box.style.width = actualCardWidth + 'px'
        }
      }
      // console.log('reLayout')
    }
  }
}
</script>

<style scoped>

@import '../../styles/common.css';

.message-container {
  width: 100%;
  /*background-color: #6fce7f;*/
}

.box {
  width: 360px;
  height: 240px;
  /*border: 1px solid #f3f67d;*/
  /*box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);*/
  /*background-color: #409EFF;*/
  display: inline-block;
}

.message-title {

}

.message-content {
  overflow: hidden auto;
  height: 128px;
  font-size: 14px;
}

.message-footer {
  text-align: right;
  position: relative;
  top: 14px;

}

/deep/ .el-card {

  height: 220px;
  margin: 0px 15px;

  border-top: 8px solid #373D41;
  border-radius: 0;
 box-shadow: 0 1px 3px 0 rgba(0,0,0,0.15)
}
</style>
