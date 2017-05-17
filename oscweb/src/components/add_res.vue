<template>
  <div id="add">
    <div class="steps-wrap">
      <p class="back-step">
      <el-tooltip class="item" effect="dark" content="重新选择操作" placement="bottom">
      <el-button type="warning" size="small" icon="circle-cross" @click="backStep"></el-button>
    </el-tooltip>
    </p>
      <el-steps :space="200" :active="stepAtv" finish-status="success" :align-center="alignStep" :center="alignStep">
        <el-step :title="stepFir"></el-step>
        <el-step :title="stepSec"></el-step>
        <el-step :title="stepThr"></el-step>
      </el-steps>
      <transition name="fade" mode="out-in">
        <div class="step-div step_0" v-if="stepAtv === 0" key="step_0">
          <ul class="oper">
            <li @click="addDoc" key="doc">
              <p><img src="/static/img/atl_ttl.png">添加教学资源</p>
              <img class="add" src="/static/img/add.png">
            </li>
            <li @click="addVdo" key="vdo">
              <p><img src="/static/img/video_ttl.png">添加师生微课</p>
              <img class="add" src="/static/img/add.png">
            </li>
          </ul>
        </div>
        <div class="step-div step_1" v-else-if="stepAtv === 1" key="step_1">
         <div class="vdo_form" v-if="addType === 'vdo'">
           <el-form ref="vdoForm" :model="vdoForm" label-width="80px" :rules="rules" v-loading="vdoFormLoad" element-loading-text="拼命上传中">
            <el-form-item label="视频名称" prop="name">
              <el-input v-model="vdoForm.name"></el-input>
            </el-form-item>
            <el-form-item label="视频地址" prop="link">
              <el-input v-model="vdoForm.link"></el-input>
            </el-form-item>
            <el-form-item label="视频描述" prop="desc"> 
              <el-input type="textarea" v-model="vdoForm.desc"></el-input>
            </el-form-item>
            <el-form-item class="form-btn">
              <el-button type="primary" @click="subVdoFrom('vdoForm')">确认上传</el-button>
              <el-button @click="rstVdoFrom('vdoForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="doc_add" v-if="addType === 'doc'">
          <textarea name="editor" id="editor"></textarea>
        </div>
      </div>
      </transition>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        alignStep: true,
        show: false,
        vdoFormLoad: false,
        stepAtv: 0,
        addType: '',
        stepFir: '选择操作',
        stepSec: '填写信息',
        stepThr: '提交表单',
        vdoForm: {
          name: '',
          link: '',
          desc: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入视频名称', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
          ],
          link: [
            { required: true, message: '请输入视频地址', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
          ],
          desc: [
            { required: true, message: '请输入视频描述', trigger: 'blur' },
            { min: 10, message: '长度大于 10 个字符', trigger: 'blur, change' }
          ]
        }
      }
    },
    methods: {
      addDoc: function () {
        this.stepAtv = 1
        this.stepFir = '添加文档'
        this.addType = 'doc'
      },
      addVdo: function () {
        this.stepAtv = 1
        this.stepFir = '添加视频'
        this.addType = 'vdo'
      },
      subVdoFrom: function (formName) {
        var self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            self.vdoFormLoad = true
            setTimeout(() => {
              if (self.vdoFormLoad === true) {
                self.vdoFormLoad = false
                self.$message.error('响应超时，上传失败！')
              }
            }, 5000)
          } else {
            self.$message.warning('表单格式不正确，请修改后提交')
            return false
          }
        })
      },
      rstVdoFrom: function (formName) {
        this.$refs[formName].resetFields()
      },
      backStep: function () {
        if (this.stepAtv === 0) {
          this.$message.warning('已经回到开始了')
        } else {
          this.stepAtv = 0
        }
      }
    },
    mounted () {
    }
  }
</script>
<style lang="sass" scoped>
  $liBg: #58B7FF
  .steps-wrap
    margin-top: 20px
    .step-div
      width: 800px
      overflow: hidden
      margin: 30px auto 0
      &.step_1
        margin-top: 30px
        width: 500px
    .step_0
      .oper
        display: flex
        justify-content: space-around
        padding-bottom: 10px
        li
          position: relative
          width: 300px
          height: 300px
          background: $liBg
          border-radius: 10px
          overflow: hidden
          color: #222
          font-size: 24px
          transition: all .4s ease-in-out
          box-shadow: 5px 5px 3px #888888
          &:hover
            cursor: pointer
            color: #fff
            .add
              transform: rotate(270deg)
          p
            text-align: center
            padding: 30px 0 0
            img
              vertical-align: middle
              margin:
                right: 10px
          .add
            position: absolute
            left: 50%
            top: 50%
            width: 90px
            transition: all .4s ease-in-out
            margin:
              left: -45px
              top: -45px
            transform: rotate(45deg)

    .form-btn
      text-align: right
    .back-step
      text-align: right

  .fade-enter-active,
    transition: all .3s ease
  .fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .fade-leave-active
    transform: translateX(-20px)
    opacity: 0
  .fade-enter
    transform: translateX(20px)
    opacity: 0
    
</style>
