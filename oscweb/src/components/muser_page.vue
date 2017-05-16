<template>
  <div id="homepage">
    <div class="page-hd" v-if="infoShow">
      <div class="hd-left">
        <div class="upload-ava">
          <div class="ava-wrap">
           <img :src="user.avatar" alt="avatar">
          </div>
          <el-upload
          class="avatar-uploader"
          action="/api/user/avatar"
          :headers="authHeader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        </div>
      </div>
      <div class="hd-right">
        <ul>
          <li class="name">
            <span class="rt-desc">昵称：</span>
            <span v-if="editName" class="editName"><el-input v-model="user.nickName" size="small"></el-input></span>
            <span v-else class="nickName">{{user.nickName}}</span>
            <i :class="[iconEdit.edit, iconEdit.marLf, {active: editName}]" @click="nameState"></i>
          </li>
          <li><span class="rt-desc">权限：</span><el-tag type="success">{{user.role | roleFormat}}</el-tag></li>
          <li><span class="rt-desc">来到社区：</span><el-tag type="primary">{{user.meta.createAt | formDate}}</el-tag></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: {},
        infoShow: false,
        imageUrl: '',
        iconEdit: {
          edit: 'el-icon-edit',
          marLf: 'icon-lf'
        },
        editName: false,
        authHeader: {}
      }
    },
    created () {
      var self = this
      this.authHeader['osc-access-token'] = localStorage.getItem('osc-access-token')
      this.fun.getInfo(self).then(data => {
        self.user = data
        self.infoShow = true
      })
    },
    filters: {
      roleFormat: function (val) {
        if (val >= 50) {
          return '管理员'
        } else if (val >= 10) {
          return '教师'
        } else {
          return '学生^_^'
        }
      }
    },
    methods: {
      handleAvatarSuccess (res, file) {
        this.imageUrl = URL.createObjectURL(file.raw)
      },
      beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      },
      nameState () {
        var self = this
        this.editName = !this.editName
        this.iconEdit.isEdit = !this.iconEdit.isEdit
        if (this.editName === false) {
          var nickName = {'nickName': this.user.nickName}
          this.$http.put('api/user/info', nickName)
            .then(res => {
              self.$message.success(res.data)
            }, res => self.$message.error(res.data))
        }
      }
    }
  }
</script>
<style lang="sass" scoped>
  $norSize: 14px
  $medSize: 16px
  $larSize: 18px
  $avaSize: 178px
  .page-hd
    display: flex
    justify-content: center
    align-items: center
    height: 200px
    font-size: $norSize
    .hd-left
      width: 200px
      text-align: center
      img
        width: $avaSize
        height: $avaSize
    .hd-right
      width: 300px
      .name
        font-size: $larSize
        font-weight: 600
        .editName
          width: 120px
        .icon-lf
          margin-left: 10px
        .active
          color: #20A0FF
      li
        display: flex
        justify-content: flex-start
        align-items: center
        margin-bottom: 10px
        height: 30px
        .rt-desc
          width: 100px
          text-align: right
          margin-right: 10px

  .upload-ava
    position: relative
    width: $avaSize
    height: $avaSize
    .ava-wrap
      position: absolute
      top: 50%
      left: 50%
      width: 100%
      height: 100%
      margin:
        left: -$avaSize/2
        top: -$avaSize/2
    .avatar-uploader
      position: absolute
      top: 50%
      left: 50%
      margin:
        left: -$avaSize/2
        top: -$avaSize/2
      border-radius: 6px
      cursor: pointer
      overflow: hidden
      width: 178px
      height: 178px
      border: 1px dashed transparent
      &:hover
        border-color: #20a0ff
      &:hover .avatar-uploader-icon
       display: block
    .avatar-uploader-icon
      display: none
      font-size: 28px
      color: #8c939d
      width: 178px
      height: 178px
      line-height: 178px
      text-align: center
    .avatar
      width: 178px
      height: 178px
      display: block
</style>
