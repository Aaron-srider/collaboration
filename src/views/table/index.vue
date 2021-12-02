<template>
  <div class="app-container">

    <my-page-header title="我创建的项目"/>

    <my-table
      :table-data="list"
      @btnClick="openDialog('insert')"
    >
      <el-table-column label="项目名字" min-width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="项目创建人" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>

      <el-table-column label="操作" min-width="95" align="right">
        <template slot-scope="scope">

          <operation-group
            :text-arr="['详情', '修改', '删除']"
            :center-handler="groupHandler"
            :handler-args="[]"
          />

<!--          <div style="text-align: right">-->

<!--            <router-link to="/example/task">-->
<!--              <span class="link">详情</span>-->
<!--            </router-link>-->

<!--            <span class="split-line">|</span>-->

<!--            <span @click="openDialog('update')" class="link">修改</span>-->

<!--            <span class="split-line">|</span>-->
<!--            <span class="link">删除</span>-->
<!--          </div>-->
        </template>
      </el-table-column>
    </my-table>

    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form :model="dialog.temp">
        <el-form-item label="项目名称" :label-width="formLabelWidth">
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/table'
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyPageHeader from '@/components/MyPageHeader'
import OperationGroup from '@/components/OperationGroup'

export default {
  components: {
    MyTable,
    MyInput,
    MyPageHeader,
    OperationGroup
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      dialog: {
        visible: false,
        temp: {},
        title: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    groupHandler(btnIndex) {
      switch (btnIndex) {
        case 0:
          debugger
          this.$router.push('/example/task')
          break
        case 1:
          this.openDialog('update')
          break
      }
    },
    toDetail() {
      return this.$router.push('/example/task')
    },
    openDialog(mode) {
      this.dialog.visible = true
      this.dialog.title = mode
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


/deep/ .el-dialog {
  width: 30%;
}

/deep/ .el-dialog__body {
  padding-bottom: 0;
}


</style>
