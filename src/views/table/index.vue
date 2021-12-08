<template>
  <div class="app-container">

    <my-page-header title="我创建的项目"/>

    <my-table
      :table-data="list"
      @btnClick="openDialog('insert')"
    >
      <el-table-column label="项目ID" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="项目名字" min-width="95">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="开始时间">
        <template slot-scope="scope">
          {{ scope.row.startDate }}
        </template>
      </el-table-column>
      <el-table-column label="结束时间" min-width="95">
        <template slot-scope="scope">
          <span>{{ scope.row.endDate }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="项目创建人" min-width="95">-->
      <!--  <template slot-scope="scope">-->
      <!--    {{ scope.row }}-->
      <!--  </template>-->
      <!--</el-table-column>-->

      <el-table-column label="操作" min-width="95" align="right">
        <template slot-scope="scope">

          <operation-group
            :text-arr="['详情', '修改', '删除']"
            :center-handler="groupHandler"
            :handler-args="[scope.row.id, scope.row, scope.row.id]"
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

    <el-dialog :title="dialog.getMode()" :visible.sync="dialog.visible" @close="dialog.temp={}">
      <el-form :model="dialog.temp">
        <el-form-item label="项目名称">
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

        <el-form-item label="项目描述">
          <my-input v-model="dialog.temp.description" width="220px" height="40px"/>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="confirmDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getList} from '@/api/table'
import MyTable from '@/components/MyTable'
import MyInput from '@/components/MyInput'
import MyPageHeader from '@/components/MyPageHeader'
import OperationGroup from '@/components/OperationGroup'
import {ProDao} from "@/model/userDao";
import {parseTimeSimple} from "@/utils";
import {Dialog} from "@/model/page";
import {Pro} from "@/model/entity";
import {ProService, TaskService} from "@/model/service";

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
      dialog: new Dialog()
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    confirmDialog() {
      this.dialog.temp.startDate = parseTimeSimple(this.dialog.temp.startDate)
      this.dialog.temp.endDate = parseTimeSimple(this.dialog.temp.endDate)
      if (this.dialog.getMode() == 'insert') {
        this.dialog.temp.uid = this.$store.getters.token
        new ProDao().create(this.dialog.temp)
      } else {
        new ProDao().update(this.dialog.temp)
      }
      this.fetchData()
      this.dialog.close()
    },
    groupHandler(btnIndex, args) {
      switch (btnIndex) {
        case 0:
          this.$router.push(`/example/task/${args}`)
          break
        case 1:
          this.openDialog('update', args)
          break
        case 2:
          this.deleteOne(args)
          break
      }
    },
    deleteOne(pid) {
      this.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

        new ProService().deleteOneProByPid(pid)
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
    toDetail() {
      return this.$router.push('/example/task')
    },
    openDialog(mode, item) {
      if (mode == 'update') {
        this.dialog.temp = Object.assign(new Pro(), item)
      }
      this.dialog.open(mode)
    },
    fetchData() {
      this.listLoading = true
      const uid = this.$store.getters.token
      this.list = new ProDao().getCreatedProsByUid(uid)
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


/deep/ .el-dialog {
  width: 30%;
}

/deep/ .el-dialog__body {
  padding-bottom: 0;
}


</style>
