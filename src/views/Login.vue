<template>
  <div class='login-view'>
    <el-form ref="form" :model="form" label-width="40%" v-loading.body="loading" element-loading-text="正在登陆...">
      <el-form-item
        label = "用户名"
        prop="username"
        :rules="[{required: true, message: '请填写用户名', trigger: 'blur'}]">
        <el-col :span="8">
          <el-input v-model="form.username"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item
        label = '密码'
        prop="password"
        :rules="[{required: true, message: '请填写密码', trigger: 'blur'}]"
        >
        <el-col :span="8">
          <el-input v-model="form.password" type="password"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onLogin('form')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    onLogin (formName) {
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('loginHandler', this.form)
            .then(() => {
              _this.loading = false
              _this.$message({
                message: '登陆成功！',
                showClose: true,
                duration: 1000
              })
              setTimeout(() => {
                _this.$router.push({name: 'home'})
              }, 1000)
            })
            .catch((errMsg) => {
              this.loading = false
              let message = '用户名或密码错误，请重试'
              if (errMsg && (errMsg.code === 219 || errMsg.code === '219')) {
                message = '登录失败次数超过限制，请稍候再试'
              }
              this.$message({
                message: message,
                showClose: true,
                duration: 2000
              })
            })
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-form-item__content {
    line-height: 14px;
  }
</style>
