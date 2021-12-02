<template>
  <div class="app-container">
    <my-page-header title="任务详情"/>

    <div style="display: inline-block; width: 58%">
      <el-card class="box-card" style="margin-bottom: 10px">
        <div slot="header" class="clearfix">
          <span>任务进度</span>
        </div>

        <div style="position: relative;" class="status-board">

          <div style="position: absolute; left:0; bottom:0; top: 0; padding: 27px 0;">
            <p>
              <span class="giant-font-24">40</span>
              <span class="split-line">/</span>
              <span class="giant-font-24">100</span>
            </p>
          </div>

          <div style="position: absolute; right:0;">

            <el-progress type="dashboard" :percentage="percentage" :color="colors"></el-progress>

            <div style="display:block; margin:0 auto; height: 20px; width: 75px; position: relative; top: -75px">
              <div style="display: inline-block; position: absolute; left: 0">
                <i class="el-icon-d-arrow-left fake-btn"></i>
              </div>
              <div style="display: inline-block;  position: absolute; right: 0">
                <i class="el-icon-d-arrow-right fake-btn"></i>
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

          <span style="display: block; overflow: hidden auto;  width:auto; height:100%; padding: 10px 10px;">
            If you’d like to learn more about Vue before diving in, we created a video walking through the core
            principles
            and a sample project.
          </span>

        </div>
      </el-card>
    </div>
    <div style="display: inline-block; width: 41%; margin-left: 10px">
      <el-card class="box-card">

        <div slot="header" class="clearfix">
          <span>任务详情</span>
        </div>

        <div style="position: relative; height: 287px" class="status-board">

          <div style="float:left; " class="my-info-basic">

            <p>
              <span>任务ID</span>
              <span>：</span>
              <span>4</span>
            </p>

            <p>
              <span>所属项目</span>
              <span>：</span>
              <span>4</span>
            </p>

            <p>
              <span>项目名称</span>
              <span>：</span>
              <span>项目1</span>
            </p>

            <p>
              <span>开始日期</span>
              <span>：</span>
              <span>2021-02-02</span>
            </p>

            <p>
              <span>结束日期</span>
              <span>：</span>
              <span>2021-02-02</span>
            </p>

            <p>
              <span>任务人数</span>
              <span>：</span>
              <span>4</span>
            </p>

            <p>
              <span>任务状态</span>
              <span>：</span>
              <span class="status-circle status-circle-success"></span>
              <span>已完成</span>
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

        <my-table :table-data="list" @btnClick="openDialog('insert')">
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
              {{ scope.row.joinTime }}
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <operation-group
                :text-arr="['留言','删除']"
                :center-handler="groupHandler"
                :handler-args="[]"
              />
            </template>
          </el-table-column>

        </my-table>


      </div>
    </el-card>

    <el-dialog title="增加成员" :visible.sync="dialog.visible">
      <el-form :model="dialog.temp">
        <el-form-item label="成员工号" :label-width="formLabelWidth">
          <my-input width="220px" height="40px"/>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import OperationGroup from '@/components/OperationGroup'
import MyPageHeader from '@/components/MyPageHeader'

export default {
  name: 'member',
  data() {
    return {
      percentage: 10,
      list: [{ name: 'wc', jobId: '22234', phone: '892892', joinTime: '79347892' }
      ],
      colors: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      dialog: {
        visible: false
      }
    }

  },
  components: {
    MyTable,
    MyInput,
    OperationGroup,
    MyPageHeader
  },
  methods: {
    openDialog(mode) {
      this.dialog.visible = true
      this.dialog.title = mode
    },
    groupHandler(btnIndex) {
      switch (btnIndex) {
        case 0:

          this.$router.push('/example/member')
          break
        case 1:
          this.openDialog('update')
          break
      }
    }
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
</style>
