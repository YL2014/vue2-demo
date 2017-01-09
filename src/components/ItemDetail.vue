<template>
  <div class="detail-view">
    <el-dialog title="项目详情" v-model="show">
      <el-table :data="detail">
        <el-table-column property="name" label="名称" width="150"></el-table-column>
        <el-table-column property="price" label="消费金额" width="150"></el-table-column>
        <el-table-column property="type" label="类型"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'detail',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      detail: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    computed: {
      showDialog () {
        return this.show
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
