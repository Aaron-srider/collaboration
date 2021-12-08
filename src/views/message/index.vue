<template>

  <div class="app-container">
    <my-page-header title="我的留言"/>
    <div id="board" class="message-container">
      <div v-for='msg in list' class="box">
        <el-card class="box-card">
          <div class="message-title">
            <span>{{msg.sender.name}}</span>
            <span class="split-line">|</span>
            <span>{{msg.sender.jobId}}</span>
          </div>
          <div class="message-content">
            <p>
              {{msg.content}}
            </p>
          </div>
          <div class="message-footer">
            <span>{{msg.createDate}}</span>
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
import {ProDao, TaskDao} from "@/model/userDao";
import {parseTimeSimple} from "@/utils";
import {Task} from "@/model/entity";
import {MsgService} from "@/model/service";

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
    return {
      list:[]
    }
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
    },

    changeProgress(task, step) {
      const progress = task.progress + step
      if (progress > 100 || progress < 0) {
        return
      }

      new TaskDao().changeProgress(task.id, step)
      this.fetchData()
    },
    confirmDialog() {
      this.dialog.temp.startDate = parseTimeSimple(this.dialog.temp.startDate)
      this.dialog.temp.endDate = parseTimeSimple(this.dialog.temp.endDate)
      if (this.dialog.getMode() == 'insert') {
        this.dialog.temp.pid = this.pid
        this.dialog.temp.progress = 0
        new TaskDao().createOneTask(this.dialog.temp)
      } else {
        new TaskDao().updateOneTask(this.dialog.temp)
      }
      this.fetchData()
      this.dialog.close()
    },
    openDialog(mode, item) {
      if (mode == 'update') {
        this.dialog.temp = Object.assign(new Task(), item)
      }
      this.dialog.open(mode)
    },

    groupHandler(btnIndex, args) {
      switch (btnIndex) {
        case 0:
          this.$router.push(`/example/member/${args}`)
          break
        case 1:
          this.openDialog('update', args)
          break
      }
    },
    fetchData() {
      this.list = new MsgService().getMsgListByUid(this.$store.getters.token)
    }
  },
  created() {
    this.fetchData()
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
