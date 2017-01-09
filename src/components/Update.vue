<template>
  <div class="update-view">
    <el-form ref="updateForm" :model="form" label-position="left" label-width="80px" v-loading="loading">
      <template v-for="(item, index) of form.items">
        <el-row>
          <el-col :span="8">
            <el-form-item
              label="项目"
              :prop="'items.'+index+'.name'"
              :rules="[{required: true, message: '请输入名称', trigger: 'blur'}]">
              <el-input v-model="item.name" placeholder="消费名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item
             :prop="'items.'+index+'.price'"
             :rules="[
              {required: true, message: '请输入金额'},
              {type: 'number', message: '金额必须为数字值'}
             ]">
              <el-input v-model.number="item.price" placeholder="消费金额"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="form.items.length > 1" :span="1" :offset="1">
            <el-button @click="removeItem(index)">删除</el-button>
          </el-col>
        </el-row>
        <el-form-item
         label="类型"
         class="el-types"
         :prop="'items.'+index+'.type'"
         :rules="[{required: true, message: '请选择类型', trigger: 'change'}]">
          <el-col :span="20">
            <el-radio-group v-model="item.type">
              <el-radio v-for="typeItem of updateTypes" :label="typeItem.val">{{typeItem.name}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="addItem">增加一项</el-button>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hideDialog">取 消</el-button>
      <el-button type="primary" @click="onUpdate">确 定</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'update',
    data () {
      return {
        form: {
          items: JSON.parse(JSON.stringify(this.formData))
        },
        loading: false
      }
    },
    computed: {
      total () {
        let total = 0
        this.form.items.map((item, index) => {
          total += item.price
        })
        return total
      }
    },
    props: {
      formData: {
        type: Array,
        default: () => {
          return []
        }
      },
      updateTypes: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      removeItem (index) {
        this.form.items.splice(index, 1)
      },
      addItem () {
        let oneItem = {
          name: '',
          price: '',
          type: '1'
        }
        this.form.items.push(oneItem)
      },
      hideDialog () {
        this.form.items = JSON.parse(JSON.stringify(this.formData))
        this.$store.dispatch('updateUIAction')
      },
      onUpdate () {
        let _this = this
        this.$refs.updateForm.validate((valid) => {
          if (valid) {
            _this.loading = true
            let id = this.$store.state.home.currentTable[this.currentIndex].id
            let submitData = this.form
            submitData.total = this.total
            this.$store.dispatch('updateAction', {
              id: id,
              form: submitData
            }).then(() => {
              _this.loading = false
              _this.$message({
                message: '更新成功！',
                showClose: true,
                duration: 1000
              })
              setTimeout(() => {
                _this.$store.dispatch('updateUIAction')
                _this.$store.dispatch('getList', {
                  resize: true,
                  page: 1,
                  date: ''
                })
              }, 1000)
            })
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
.update-view {
  .el-dialog--small {
    width: 76%;
  }
  .dialog-footer {
    text-align: right;
  }
}

</style>
