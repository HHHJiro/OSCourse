<template>
  <div class="add">
    <div class="upload-form">
    <el-form ref="uploadForm" :model="uploadForm" label-width="80px" :rules="rules" v-loading="formLoading" element-loading-text="拼命上传中">
      <el-form-item label="文件名称" prop="name">
      <el-input v-model="uploadForm.name"></el-input>
      </el-form-item>
      <el-form-item label="上传文件" prop="path">
      <el-upload
      class="upload-demo"
      ref="upload"
      drag
      action="/api/resource/server"
      multiple="multiple"
      :on-change="handleChange"
      :headers="authHeader"
      :on-success="getPath"
      :disabled="uploadLock"
      :on-remove="removeFile"
      :before-upload="beforeUpload"
      :auto-upload="autoUpload"
      :file-list="fileList">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      </el-form-item>
      <el-form-item label="上传类型" prop="type">
      <el-select v-model="uploadForm.category" placeholder="选择上传的类型">
          <el-option label="师生微课" value="micro"></el-option>
          <el-option label="教学资源" value="teachRes"></el-option>
          <div class="role" v-if="role >= 10">
            <el-option label="教学视频" value="teachVdo"></el-option>
            <el-option label="教学大纲" value="teachOutLine"></el-option>
          </div>
        </el-select>
      </el-form-item>
      <el-form-item label="文件描述" prop="desc"> 
      <el-input type="textarea" v-model="uploadForm.desc"></el-input>
      </el-form-item>
      <el-form-item class="form-btn">
      <el-button type="primary" @click="subForm('uploadForm')">确认上传</el-button>
      <el-button @click="rstFrom('uploadForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      fileList: [],
      autoUpload: false,
      multiple: false,
      uploadLock: false,
      uploadForm: {
        name: '',
        path: '',
        desc: '',
        category: ''
      },
      role: 0,
      authHeader: {},
      formLoading: false,
      rules: {
        name: [
        { required: true, message: '请输入视频名称', trigger: 'blur' },
        { min: 4, max: 20, message: '长度在 4 到 20 个字符', trigger: 'blur' }
        ],
        path: [
        { required: true, message: '请上传文件', trigger: 'change' }
        ],
        desc: [
        { required: true, message: '请输入视频描述', trigger: 'blur' },
        { min: 10, message: '长度大于 10 个字符', trigger: 'blur, change' }
        ],
        category: [
        { required: true, message: '请选择上传类型', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    var self = this
    this.$set(self.authHeader, 'osc-access-token', localStorage.getItem('osc-access-token'))
    this.fun.getInfo(self).then(data => {
      self.role = data.role
    })
  },
  methods: {
    beforeUpload: function (file) {
      var category = this.uploadForm.category
      var filType = file.type
      console.log(filType)
      var categorys = {
        'micro': ['video/mp4'],
        'teachRes': ['video/mp4', 'application/x-zip-compressed'],
        'teachVdo': ['video/mp4'],
        'teachOutLine': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      }
      if (category === '') {
        this.$message.error('选择上传类型后再上传')
        return false
      } else {
        const isType = categorys[category].includes(filType)
        console.log(isType)
        if (!isType) {
          this.$message.error('上传格式不正确!')
        }
        return isType
      }
    },
    handleChange: function (file, fileList) {
      this.uploadLock = true
    },
    removeFile: function () {
      this.uploadLock = false
    },
    rstFrom: function (formName) {
      this.$refs[formName].resetFields()
      this.$refs.upload.clearFiles()
      this.uploadLock = false
    },
    subForm: function (formName) {
      var self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          self.formLoading = true
          self.$http.post('api/resource/db', self.uploadForm)
            .then(res => {
              self.$message.success('添加成功')
              self.formLoading = false
              self.rstFrom('uploadForm')
            }, res => {
              self.formLoading = false
              self.$message.error('添加失败')
            })
            .catch(err => console.log(err))
        } else {
          self.$message.warning('表单格式不正确，请修改后提交')
          return false
        }
      })
    },
    submitUpload: function () {
      this.$refs.upload.submit()
    },
    getPath: function (res, file, fileList) {
      this.$message.success(res.msg)
      this.uploadForm.path = res.path
    }
  }
}
</script>
<style lang="sass" scoped>
  .add
    display: flex
    justify-content: center
    margin-top: 20px
    .upload-form
      min-width: 500px
      width: 600px
</style>
