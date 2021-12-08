<template>
  <div class="app-container">
    <my-page-header title="项目详情"/>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目状态</span>
      </div>

      <div style="position: relative;" class="status-board">

        <div style="position: absolute; left:0; bottom:0; top: 0; padding: 37px 0;">
          <p>
            <span class="giant-font-24">{{ completedTaskPercent }}</span>
            <span class="split-line">/</span>
            <span class="giant-font-24">100</span>
          </p>
        </div>

        <div style="position: absolute; right:0">
          <el-progress type="circle" :percentage="completedTaskPercent"></el-progress>
        </div>

      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>项目详情</span>
      </div>

      <div style="position: relative; height: 154px;" class="status-board">

        <div style="float:left; " class="my-info-basic">

          <p>
            <span>项目名称</span>
            <span>：</span>
            <span>{{ pro.name }}</span>
          </p>

          <p>
            <span>开始日期</span>
            <span>：</span>
            <span>{{ pro.startDate }}</span>
          </p>

          <p>
            <span>结束日期</span>
            <span>：</span>
            <span>{{ pro.endDate }}</span>
          </p>

          <p>
            <span>项目人数</span>
            <span>：</span>
            <span>{{countMember}}</span>
          </p>
        </div>


        <div class="my-info-description" style="float:right; ">

          <span style="display: inline-block; position:relative; bottom:140px;">项目备注：</span>

          <span class="auto-overflow" style="display: inline-block;  width:300px; height:154px; box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
padding: 10px 10px;"
          >
            {{ pro.description }}
          </span>
        </div>

      </div>
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>任务列表</span>
      </div>

      <div style="position: relative; height: 500px;" class="status-board">

        <my-table :table-data="list" @btnClick="openDialog('insert')">

          <el-table-column label="任务名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">
              {{ scope.row.startDate }}
            </template>
          </el-table-column>
          <el-table-column label="截止时间">
            <template slot-scope="scope">
              {{ scope.row.endDate }}
            </template>
          </el-table-column>
          <el-table-column label="重要程度">
            <template slot-scope="scope">
              {{ scope.row.importance }}
            </template>
          </el-table-column>
          <el-table-column label="完成度" min-width="140">
            <template slot-scope="scope">
              <div style="display: inline-block; margin:0 10px">
                <i @click="changeProgress(scope.row,-10)" class="el-icon-d-arrow-left fake-btn"></i>
              </div>
              <div style="display: inline-block; width: 150px">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="scope.row.progress"/>
              </div>
              <div style="display: inline-block;  margin:0 10px">
                <i @click="changeProgress(scope.row,10)" class="el-icon-d-arrow-right fake-btn"
                   style="cursor:pointer;"></i>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <operation-group
                :text-arr="['详情', '修改', '删除']"
                :center-handler="groupHandler"
                :handler-args="[scope.row.id, scope.row, scope.row.id]"
              />
            </template>
          </el-table-column>

        </my-table>


      </div>
    </el-card>

    <el-dialog :title="dialog.getMode()" :visible.sync="dialog.visible" @close="dialog.temp={}">
      <el-form :model="dialog.temp">
        <el-form-item label="任务名称">
          <my-input v-model="dialog.temp.name" width="220px" height="40px"/>
          <!--          <input style="border: 1px solid #dcdfe6; width: 220px; height: 40px"/>-->
        </el-form-item>

        <el-form-item label="开始日期">
          <el-date-picker
            v-model="dialog.temp.startDate"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="截止日期">
          <el-date-picker
            v-model="dialog.temp.endDate"
            type="date"
            placeholder="截止日期"
          >
          </el-date-picker>
        </el-form-item>
        <div>

          <label style="display: inline-block; margin-right: 20px; position: relative; bottom: 14px">重要程度</label>

          <div style="display: inline-block; width:212px">
            <el-slider
              v-model="dialog.temp.importance"
              :step="10"
            >
            </el-slider>
          </div>
        </div>

        <el-form-item label="任务备注">
          <my-input v-model="dialog.temp.description" width="220px" height="40px"/>
        </el-form-item>

        <!--        <el-form-item label="重要程度" :label-width="formLabelWidth">-->
        <!--          <div style="float:right; width: 100px">-->

        <!--          </div>-->

        <!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyPageHeader from '@/components/MyPageHeader'
import {getList} from '@/api/table'
import OperationGroup from '@/components/OperationGroup'
import {Dialog} from "@/model/page";
import {Pro, Task, U_T} from "@/model/entity";
import {ProDao, TaskDao, U_TDao, UserDao} from "@/model/userDao";
import {parseTimeSimple} from "@/utils";
import {TaskService, UserService} from "@/model/service";

export default {
  name: 'task',
  components: {
    MyTable,
    MyInput,
    OperationGroup,
    MyPageHeader
  },
  data() {
    return {
      pro: {},
      list: [],
      dialog: new Dialog(),
      pid: this.$route.params.pid
    }
  },
  computed: {
    countMember() {
      const count = 0
      const idlist = this.list.map((task) => {
          return task.id
      })

      return new U_TDao().countMembersByTidList(idlist)
    },
    completedTaskPercent() {

      const count = this.list.length
      if(count == 0) {
        return 0
      }
      let compeletion = 0
      this.list.forEach((item) => {
        compeletion += item.progress
      })
      return Math.floor(compeletion / (count))
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
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
          this.$router.push(`/member/${args}`)
          break
        case 1:
          this.openDialog('update', args)
          break
        case 2:
          this.deleteOne(args)
          break
      }
    },
    deleteOne(tid) {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        new TaskService().deleteByTid(tid)

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
      this.pro = new ProDao().getOneProByPid(this.pid)
      this.list = new TaskDao().getAllTasksByPid(this.pid)
      this.listLoading = false
      // getList().then(response => {
      //   this.list = response.data.items
      //   this.listLoading = false
      // })
    }
  }
}
</script>

<style scoped>
@import '../../styles/common.css';

.box-card {
  margin: 10px 0;
}

.status-board {
  height: 130px;
}

.my-info-basic {


}

.my-info-description {
  width: 385px;
  height: 154px;
}

/deep/ .el-dialog {
  width: 24%;
}
</style>
