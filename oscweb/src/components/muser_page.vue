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
    <div class="page-ctn">
      <p class="m-upload">
      <i class="el-icon-upload icon-style"></i>
        <span class="upload-text">我的上传</span>
      <el-button-group class="upload-btns">
        <el-button type="primary" size="small" @click="refreshUpload">刷新</el-button>
        <el-button type="primary" size="small" @click="upload">我要上传</el-button>
      </el-button-group>
      </p>
       <el-table
    :data="uploads"
    :default-sort = "{prop: 'date', order: 'descending'}"
    v-loading="refreshFlag"
    element-loading-text="拼命加载中"
    border
    style="width: 100%">
    <el-table-column
      label="上传日期"
      prop="date"
      :resizable="!isTrue"
      sortable
      width="150">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>
<el-table-column
      label="文件名称"
      :resizable="!isTrue"
      width="180">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>文件描述: {{ scope.row.desc }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag :type="tagSecType[scope.row.type]">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="文件类型"
      :resizable="!isTrue"
      width="100">
      <template scope="scope">
      <el-tag >{{scope.row.path | fileType}}</el-tag>
      </template>
    </el-table-column>
        <el-table-column
      label="所属版块"
      :resizable="!isTrue"
      width="120"
      prop="type"
        :filters="section"
        :filter-method="filterType"
        filter-placement="bottom-end"
      class="pointer"
      >
      <template scope="scope">
      <el-tag :type="tagSecType[scope.row.type]">{{ scope.row.type | formType}}</el-tag>
      </template>
    </el-table-column>
            <el-table-column
            :resizable="!isTrue"
      label="浏览人数"
      prop="pv"
      :sortable="isTrue"
      width="120">
      <template scope="scope">
      <el-tag type="danger">{{scope.row.pv}}人</el-tag>
      </template>
    </el-table-column>
    <el-table-column label="操作" :resizable="!isTrue">
      <template scope="scope">
        <el-button
          size="small"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        infoShow: false,
        isTrue: true,
        editName: false,
        refreshFlag: false,
        user: {},
        section: [
          { text: '师生微课', value: 'micro' },
          { text: '教学资源', value: 'teach' },
          { text: '教学视频', value: 'video' }
        ],
        imageUrl: '',
        iconEdit: {
          edit: 'el-icon-edit',
          marLf: 'icon-lf'
        },
        authHeader: {},
        tagSecType: {
          'micro': 'success',
          'teach': 'primary',
          'video': 'warning'
        },
        uploads: []
      }
    },
    created () {
      this.getUploads()
    },
    filters: {
      roleFormat: function (val) {
        if (val >= 50) {
          return '管理员'
        } else if (val >= 10) {
          return '教师'
        } else {
          return '同学'
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
      },
      filterType (value, row) {
        return row.type === value
      },
      getUploads () {
        var self = this
        this.authHeader['osc-access-token'] = localStorage.getItem('osc-access-token')
        this.fun.getInfo(self)
        .then(data => {
          self.user = data
          self.infoShow = true
          return data
        })
        .then(data => {
          self.getSelfUploads(data)
        })
      },
      getSelfUploads (user) {
        var self = this
        this.$http.get('api/resource/uploadBy/' + user._id)
        .then(res => {
          this.uploads = res.data
          this.uploads.map(item => {
            item.date = item.meta.createAt.substr(0, 10)
          })
        })
        .then(res => {
          setTimeout(() => {
            self.refreshFlag = false
          }, 500)
        })
      },
      refreshUpload () {
        this.refreshFlag = true
        this.getSelfUploads(this.user)
      },
      upload () {
        this.$router.push('/res/add')
      },
      handleEdit (index, row) {
        console.log(index, row)
      },
      handleDelete (index, row) {
        console.log(index, row)
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
    padding: 10px 0 20px
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
  .page-ctn
    width: 830px
    margin: 10px auto
  .m-upload
    margin: 10px 0
    height: 30px
    display: flex
    justify-content: flex-start
    align-items: center
    .icon-style
      font-size: 30px
      color: #20A0FF
    .upload-text
      font-size: 18px
      line-height: 30px
      padding-left: 10px
    .upload-btns
      margin: 0 10px
</style>
