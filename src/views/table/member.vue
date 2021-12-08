<template>
  <div class="app-container">
    <my-page-header tag="头" title="任务详情"/>

    <div style="display: inline-block; width: 58%">
      <el-card class="box-card" style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <span>任务进度</span>
        </div>

        <div style="position: relative;" class="status-board">

          <div style="position: absolute; left:0; bottom:0; top: 0; padding: 27px 0;">
            <p>
              <span class="giant-font-24">{{ task.progress }}</span>
              <span class="split-line">/</span>
              <span class="giant-font-24">100</span>
            </p>
          </div>

          <div style="position: absolute; right:0;">

            <el-progress type="dashboard" :percentage="task.progress" :color="colors"></el-progress>

            <div style="display:block; margin:0 auto; height: 20px; width: 75px; position: relative; top: -75px">
              <div style="display: inline-block; position: absolute; left: 0">
                <i @click="changeProgress(task,-10)" class="el-icon-d-arrow-left fake-btn"></i>
              </div>
              <div style="display: inline-block;  position: absolute; right: 0">
                <i @click="changeProgress(task,10)" class="el-icon-d-arrow-right fake-btn"></i>
              </div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="box-card">

        <div slot="header" class="clearfix">
          <span>任务描述</span>
        </div>

        <div style="position: relative;" class="status-board">

          <span class="auto-overflow" style="display: block;  width:auto; height:100%; padding: 10px 10px;">
            {{ task.description }}
          </span>

        </div>
      </el-card>
    </div>
    <div title="任务详情" style="display: inline-block; width: 41%; margin-left: 10px">
      <el-card class="box-card">

        <div slot="header" class="clearfix">
          <span>任务详情</span>
        </div>

        <div style="position: relative; height: 287px" class="status-board">

          <div style="float:left; " class="my-info-basic">

            <p>
              <span>任务ID</span>
              <span>：</span>
              <span>{{ task.id }}</span>
            </p>

            <p>
              <span>所属项目</span>
              <span>：</span>
              <span>{{ pro.name }}</span>
            </p>

            <p>
              <span>任务名称</span>
              <span>：</span>
              <span>{{ task.name }}</span>
            </p>

            <p>
              <span>开始日期</span>
              <span>：</span>
              <span>{{ task.startDate }}</span>
            </p>

            <p>
              <span>结束日期</span>
              <span>：</span>
              <span>{{ task.endDate }}</span>
            </p>

            <p>
              <span>任务人数</span>
              <span>：</span>
              <span>{{ list.length }}</span>
            </p>

            <p>
              <span>任务状态</span>
              <span>：</span>
              <span :class="taskStatusIcon"></span>
              <span>{{ task.completion() ? "已完成" : "进行中" }}</span>
            </p>
          </div>

        </div>
      </el-card>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>成员列表</span>
      </div>

      <div style="position: relative; height: 500px; margin-top: 20px" class="status-board">

        <my-table :table-data="list" @btnClick="openDialog()">
          <template slot="title-text">您可以通过以下表格管理项目组成员</template>
          <el-table-column label="姓名">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="工号">
            <template slot-scope="scope">
              {{ scope.row.jobId }}
            </template>
          </el-table-column>
          <el-table-column label="联系电话">
            <template slot-scope="scope">
              {{ scope.row.phone }}
            </template>
          </el-table-column>
          <el-table-column label="加入时间">
            <template slot-scope="scope">
              {{ scope.row.joinDate }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <operation-group
                :text-arr="['留言', '删除']"
                :center-handler="groupHandler"
                :handler-args="[scope.row.id, scope.row.id]"
              />
            </template>
          </el-table-column>

        </my-table>


      </div>
    </el-card>

    <el-dialog :title="dialog.mode" :visible.sync="dialog.visible" @close="dialog.temp={}">
      <el-form>
        <el-form-item label="成员工号">
          <my-input v-model="dialog.temp.content" width="220px" height="40px"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :title="msgDialog.mode" :visible.sync="msgDialog.visible" @close="msgDialog.temp={}">
      <el-form>
        <el-form-item label="留言内容">
          <my-input v-model="msgDialog.temp.content" width="220px" height="40px"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmMsgDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import OperationGroup from '@/components/OperationGroup'
import MyPageHeader from '@/components/MyPageHeader'
import {Dialog} from "@/model/page";
import {MsgDao, ProDao, TaskDao, U_TDao} from "@/model/userDao";
import {parseTimeComplex, parseTimeSimple} from "@/utils";
import {Message, Task} from "@/model/entity";
import {TaskService, UserService} from "@/model/service";

export default {
  name: 'member',
  data() {
    return {
      pro: {},
      task: {},
      list: [],
      dialog: new Dialog(),
      msgDialog: new Dialog(),
      tid: this.$route.params.tid,
      percentage: 10,
      colors: [
        {color: '#f56c6c', percentage: 20},
        {color: '#e6a23c', percentage: 40},
        {color: '#5cb87a', percentage: 60},
        {color: '#1989fa', percentage: 80},
        {color: '#6f7ad3', percentage: 100}
      ],
    }

  },
  components: {
    MyTable,
    MyInput,
    OperationGroup,
    MyPageHeader
  },
  created() {
    this.fetchData()
  },
  computed: {
    taskStatusIcon() {
      const obj = {
        "status-circle": true,
        "status-circle-success": this.task.completion(),
        "status-circle-proceeding": !this.task.completion()
      }

      return obj
    }
  },
  methods: {
    confirmMsgDialog() {
      const msg = new Message(undefined, this.$store.getters.token, this.msgDialog.temp.rid, this.msgDialog.temp.content,
        parseTimeComplex(new Date()))
      new MsgDao().createOneMsg(msg)
      this.msgDialog.close()
    },
    openMsgDialog(rid) {
      this.msgDialog.open('message')
      this.msgDialog.temp.rid = rid
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
      try {
        new UserService().join(this.dialog.temp.content, this.tid)
      } catch (e) {
        if (e == 0) {
          this.$message(`本系统中没有工号为“${this.dialog.temp.content}”的用户`)
        }
        if (e == 1) {
          this.$message(`工号为“${this.dialog.temp.content}”的用户已经在该项目组中`)
        }
      }

      this.fetchData()
      this.dialog.close()
    },
    openDialog() {
      this.dialog.open('insert')
    },
    groupHandler(btnIndex, args) {
      switch (btnIndex) {
        case 0:
          this.openMsgDialog(args)
          break
        case 1:
          this.deleteOne(args)
          break
      }
    },
    deleteOne(uid) {
      this.$confirm('此操作将永久删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new U_TDao().deleteByTidAndUidList(this.tid, [uid])

        this.fetchData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

    },
    fetchData() {
      this.listLoading = true
      this.pro = new TaskService().getProByTid(this.tid)
      this.task = new TaskDao().getOneByTid(this.tid)
      this.list = new UserService().getAllUsersByTid(this.tid)
      this.listLoading = false
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }


    // openDialog(mode) {
    //   const map = {
    //     insert: '增加成员',
    //     message: '留言'
    //   }
    //   this.dialog.visible = true
    //   this.dialog.title = map[mode]
    //   this.dialog.mode = mode
    // },
    // groupHandler(btnIndex) {
    //   switch (btnIndex) {
    //     case 0:
    //       this.openDialog('message')
    //       break
    //     case 1:
    //       // this.openDialog('update')
    //       break
    //   }
    // }
  }

}
</script>

<style scoped>
@import '../../styles/common.css';

.status-board {
  height: 110px;
}

/deep/ .el-card__body {
  padding: 0 20px;
}

.status-circle {
  display: inline-block;
  background-color: #000000;
  width: 10px;
  height: 10px;
  border-radius: 10px;
  margin-right: 5px;
}

.status-circle-success {
  background-color: #6fce7f;
}

.status-circle-proceeding {
  background-color: #f3f67d;
}

/deep/ .el-dialog {
  width: 30%;
}

/deep/ .el-dialog__body {
  padding: 10px 20px;
}

/deep/ .el-dialog__body .el-form-item {
  margin-bottom: 10px;
}


</style>
