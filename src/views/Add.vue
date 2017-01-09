<template>
  <div class='add-view'>
    <el-form ref="form" :model="form" label-position="left" label-width="80px" v-loading.body="loading" element-loading-text="提交中...">
      <template v-for="(item, index) of form.items">
        <el-row>
          <el-col :span="4">
            <el-form-item
              label="项目"
              :prop="'items.'+index+'.name'"
              :rules="[{required: true, message: '请输入名称', trigger: 'blur'}]">
              <el-input v-model="item.name" placeholder="消费名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
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
          <el-col :span="10">
            <el-radio-group v-model="item.type">
              <el-radio v-for="typeItem of types" :label="typeItem.val">{{typeItem.name}}</el-radio>
            </el-radio-group>
          </el-col>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="addItem">增加一项</el-button>
      </el-form-item>
      <el-form-item
       label="日期"
       prop="date"
       :rules="[{type: 'date', required: true, message: '请选择日期', trigger: 'change'}]">
        <el-date-picker
          v-model="form.date"
          type="date"
          :editable='editable'
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="default" @click="resetForm('form')">重置</el-button>
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { addOneItem } from '../api'
export default {
  name: 'add',
  created () {
    this.types = this.getTypes()
  },
  data () {
    return {
      types: [],
      form: {
        date: '',
        items: [
          {
            name: '',
            price: '',
            type: '1'
          }
        ]
      },
      editable: false,
      loading: false
    }
  },
  methods: {
    addItem () {
      let oneItem = {
        name: '',
        price: '',
        type: '1'
      }
      this.form.items.push(oneItem)
    },
    removeItem (index) {
      this.form.items.splice(index, 1)
    },
    getTypes () {
      return [
        { name: '分类1', val: '1' },
        { name: '分类2', val: '2' },
        { name: '分类3', val: '3' },
        { name: '分类4', val: '4' },
        { name: '分类5', val: '5' }
      ]
    },
    submitForm (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          _this.loading = true
          let formData = this.form
          formData.total = this.computerTotal()
          addOneItem(formData).then((data) => {
            _this.resetForm('form')
            _this.loading = false
            _this.$message({
              message: '提交成功！',
              showClose: true,
              duration: 1000
            })
            setTimeout(() => {
              _this.$router.push('home')
            }, 1000)
          }, (errorMesg) => {
            _this.loading = true
            console.log(errorMesg)
            _this.$message({
              message: '提交失败，请重试！',
              showClose: true,
              duration: 2000
            })
          })
        }
      })
    },
    computerTotal () {
      let total = 0
      this.form.items.map((item, index) => {
        total += item.price
      })
      return total
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang='scss' scoped>
.el-types {
  padding-bottom: 20px;
}
</style>
