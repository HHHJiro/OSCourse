<template>
  <div class="m-lgn">
    <el-button type="text" @click="lgnFormVis = true"><el-tag type="primary">注册</el-tag></el-button>
    <el-button type="text" @click="lgnInFormVis = true"><el-tag type="success">登陆</el-tag></el-button>
    <!-- 注册 -->
    <el-dialog title="用户注册" v-model="lgnFormVis" :size="dialogSize" :modal-append-to-body="maskOnBody">
      <el-form :model="login" :rules="lgnRls" ref="login" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-form-item label="账号" prop="id">
          <el-input v-model.number="login.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="login.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="login.checkPass" auto-complete="off"></el-input>
        </el-form-item>
<!--         <el-form-item>
          <el-button type="primary" @click="submitForm('login')">提交</el-button>
          <el-button @click="resetForm('login')">重置</el-button>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lgnFormVis = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('login')" >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 注册结束 -->

    <!-- 登陆 -->
    <el-dialog title="用户登陆" v-model="lgnInFormVis" :size="dialogSize" :modal-append-to-body="maskOnBody">
      <el-form :model="lgnIn" :rules="logInRls" ref="lgnIn" label-width="100px" class="demo-ruleForm" :label-position="labelPosition">
        <el-form-item label="账号" prop="id">
          <el-input v-model.number="lgnIn.id"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="lgnIn.pass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="lgnInFormVis = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('lgnIn')" >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 登陆结束 -->
  </div>
</template>
<script>
  export default {
    data () {
      var checkLgnId = (rule, value, callback) => {
        var RegId = /^[a-zA-Z]\w{5,9}$/
        if (!value) {
          return callback(new Error('账号不能为空'))
        }
        setTimeout(() => {
          if (!RegId.test(value)) {
            callback(new Error('请输入正确的ID 以字母开头大于6个字符且小于10个字符'))
          } else {
            callback()
          }
        }, 1000)
      }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.login.checkPass !== '') {
            this.$refs.login.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.login.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        labelPosition: 'top',
        dialogSize: 'tiny',
        lgnFormVis: false,
        lgnInFormVis: false,
        maskOnBody: false,
        login: {
          pass: '',
          checkPass: '',
          id: ''
        },
        lgnIn: {
          id: '',
          pass: ''
        },
        lgnRls: {
          pass: [
          { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
          { validator: validatePass2, trigger: 'blur' }
          ],
          id: [
          { validator: checkLgnId, trigger: 'blur' }
          ]
        },
        logInRls: {
          pass: [
          { validator: validatePass, trigger: 'blur' }
          ],
          id: [
          { validator: checkLgnId, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
        var self = this
        if (formName === 'login') {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$message({
                message: `用户：${self.login.id} 注册成功`,
                type: 'success'
              })
              self.lgnFormVis = false
            } else {
              console.log('error submit!!')
              return false
            }
          })
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              this.$message({
                message: `欢迎用户：${self.lgnIn.id}`,
                type: 'success'
              })
              self.lgnInFormVis = false
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style lang="sass">
  .m-lgn
    display: flex
    align-items: center
    justify-content: space-around
    height: 100%
</style>
