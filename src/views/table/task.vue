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
            <span class="giant-font-24">40</span>
            <span class="split-line">/</span>
            <span class="giant-font-24">100</span>
          </p>
        </div>

        <div style="position: absolute; right:0">
          <el-progress type="circle" :percentage="25"></el-progress>
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
            <span>项目人数</span>
            <span>：</span>
            <span>4</span>
          </p>
        </div>


        <div class="my-info-description" style="float:right; ">

          <span style="display: inline-block; position:relative; bottom:140px;">项目备注：</span>

          <span style="display: inline-block; overflow-y: scroll; width:300px; height:154px; box-shadow:0 2px 12px 0 rgba(0, 0, 0, 0.1);
padding: 10px 10px;"
          >
            If you’d like to learn more about Vue before diving in, we created a video walking through the core
            principles
            and a sample project.
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
              {{ scope.row.author }}
            </template>
          </el-table-column>
          <el-table-column label="开始时间">
            <template slot-scope="scope">
              {{ scope.row.author }}
            </template>
          </el-table-column>
          <el-table-column label="截止时间">
            <template slot-scope="scope">
              83475923745902739457293475923798
            </template>
          </el-table-column>
          <el-table-column label="重要程度">
            <template slot-scope="scope">
              {{ scope.row.author }}
            </template>
          </el-table-column>
          <el-table-column label="完成度" min-width="140">
            <template slot-scope="scope">
              <div style="display: inline-block; margin:0 10px">
                <i class="el-icon-d-arrow-left fake-btn"></i>
              </div>
              <div style="display: inline-block; width: 150px">
                <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>
              </div>
              <div style="display: inline-block;  margin:0 10px">
                <i class="el-icon-d-arrow-right fake-btn" style="cursor:pointer;"></i>
              </div>

              <!--              {{ scope.row.title }}-->
            </template>
          </el-table-column>
          <el-table-column label="操作" align="right">
            <template slot-scope="scope">
              <operation-group
                :text-arr="['详情', '修改', '删除']"
                :center-handler="groupHandler"
                :handler-args="[]"
              />
            </template>
          </el-table-column>

        </my-table>


      </div>
    </el-card>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form :model="dialog.temp">
        <el-form-item label="任务名称" :label-width="formLabelWidth">
          <my-input width="220px" height="40px"/>
          <!--          <input style="border: 1px solid #dcdfe6; width: 220px; height: 40px"/>-->
        </el-form-item>

        <el-form-item label="开始日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="开始日期"
          >
          </el-date-picker>
        </el-form-item>

        <el-form-item label="截止日期" :label-width="formLabelWidth">
          <el-date-picker
            v-model="value1"
            type="date"
            placeholder="截止日期"
          >
          </el-date-picker>
        </el-form-item>
        <div>

          <label style="display: inline-block; margin-right: 20px; position: relative; bottom: 14px">重要程度</label>

          <div style="display: inline-block; width:212px">
            <el-slider
              v-model="value1"
              :step="10"
            >
            </el-slider>
          </div>
        </div>

        <!--        <el-form-item label="重要程度" :label-width="formLabelWidth">-->
        <!--          <div style="float:right; width: 100px">-->

        <!--          </div>-->

        <!--        </el-form-item>-->
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
import MyPageHeader from '@/components/MyPageHeader'
import { getList } from '@/api/table'
import OperationGroup from '@/components/OperationGroup'

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
      value1: 10,
      list: undefined,
      dialog: {
        visible: false,
        temp: {},
        title: ''
      }
    }
  },
  mounted() {
    this.fetchData()
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
    },
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
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
  width: 30%;
}
</style>
