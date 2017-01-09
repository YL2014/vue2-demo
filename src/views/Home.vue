<template>
  <div class='add-view'>
    <el-form ref="form" :model="form" label-width = "80px">
      <el-form-item label="时间">
        <el-date-picker
          v-model="form.date"
          type="date"
          :editable="editable"
          placeholder="选择日期">
        </el-date-picker>
        <el-button type="primary" class="find" @click="findForm({resize: true})">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="currentTable"
      border
      style="width: 100%"
      v-loading="loading">
      <el-table-column prop="date" label="日期" width="200">
        <template scope="scope">
          <el-icon name="time"></el-icon>
          <span style="margin-left: 10px;">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="total" label="Total"> </el-table-column>
      <el-table-column
        label="操作"
        width="200">
        <template scope="scope">
          <el-button size="small" type="info" @click="handleView(scope.$index, scope.row)">查看</el-button>
          <el-button size="small" type="warning" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-size="10"
      layout="prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <el-dialog title="项目详情" v-model="showDetail">
      <el-table :data="detailData">
        <el-table-column property="name" label="名称" width="150"></el-table-column>
        <el-table-column property="price" label="消费金额" width="150"></el-table-column>
        <el-table-column property="type" label="类型"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog title="Update" v-model="showUpdate">
      <update :updateTypes="types" :formData="updateForm" :index="currentIndex"></update>
    </el-dialog>
  </div>
</template>

<script>
import Update from '../components/Update.vue'
export default {
  name: 'home',
  created () {
    this.findForm()
  },
  data () {
    return {
      form: {
        date: ''
      },
      editable: false,
      loading: true,
      showDetail: false, // 显示详情视图
      detailData: [], // 详情的数据
      updateForm: [], // 更新视图的数据,
      currentIndex: 0
    }
  },
  computed: {
    currentTable () {
      return this.$store.state.home.currentTable
    },
    total () {
      return this.$store.state.home.total
    },
    page () {
      return this.$store.state.home.page
    },
    types () {
      return this.$store.state.types.types
    },
    showUpdate () {
      return this.$store.state.home.UI.showUpdate
    }
  },
  components: { Update },
  methods: {
    findForm (option) {
      let param = Object.assign({}, {
        resize: false,
        page: 1,
        date: this.form.date
      }, option)
      this.$store.dispatch('getList', param)
      let _this = this
      setTimeout(() => {
        _this.loading = false
      }, 1500)
    },
    handleView (index, row) {
      this.showDetail = true
      this.detailData = this.$store.state.home.currentTable[index].items
      console.log(this.detailData)
    },
    handleEdit (index, row) {
      this.$store.dispatch('updateUIAction')
      this.currentIndex = index
      this.updateForm = this.$store.state.home.currentTable[index].items
    },
    handleDelete (index, row) {
      let _this = this
      this.$confirm('此操作将永久删除该记录，是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.loading = true
        this.$store.dispatch('deleteAction', index).then(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '删除成功',
            duration: 1000
          })
          setTimeout(() => {
            _this.findForm({resize: true})
          })
        }).catch(() => {
          this.loading = false
          this.$message({
            type: 'success',
            message: '删除失败，请重试',
            duration: 1000
          })
        })
      }).catch(() => {
        this.loading = false
        console.log('cancel')
      })
    },
    handleCurrentChange (currentPage) {
      this.findForm({
        page: currentPage
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.el-form {
  margin-bottom: 30px;
}
.find {
  margin-left: 40px;
}
.el-pagination {
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  width: 400px;
}
</style>
