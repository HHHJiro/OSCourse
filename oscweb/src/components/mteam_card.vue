<template>
  <div class="team-card">
    <div class="card-wrap">
      <el-row>
        <el-col :span="6">
          <el-row>
            <img class="avatar" :src="user.avatar">
          </el-row>
          <el-row>
            <el-col :span="20" :offset="2">
              <el-button class="edit-btn" type="success" @click="dialogFormVisible = true">编辑</el-button>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" v-if="infoVis"  v-loading="loading"
        element-loading-text="拼命加载中">
          <el-row :gutter="20">
            <el-col :span="6">
              <div><strong>姓名</strong></div>
            </el-col>
            <el-col :span="18" class="bg-col">
              <div><strong>{{team.name}}</strong></div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div><strong>职称</strong></div>
            </el-col>
            <el-col :span="18" class="bg-col">
              <div><el-tag type="warning">{{team.title | teamTitle}}</el-tag></div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <div><strong>个人简介</strong></div>
            </el-col>
            <el-col :span="18" class="bg-col">
              <div>
                <p class="desc">{{team.desc}}</p>
              </div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="16" v-else>
          <div class="info">
            <p>点击编辑创建信息</p>
          </div>
        </el-col>
      </el-row>
      <el-dialog title="团队信息" :visible.sync="dialogFormVisible" size="tiny">
        <el-form :model="form" label-width="80px" label-position="top">
          <el-form-item label="姓名">
            <el-input v-model.trim="form.name" :placeholder="team.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="选择职称">
            <el-select v-model.trim="form.title" :placeholder="team.title | teamTitle">
              <el-option label="助教" value="tit1"></el-option>
              <el-option label="讲师" value="tit2"></el-option>
              <el-option label="副教授" value="tit3"></el-option>
              <el-option label="教授" value="tit4"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" :placeholder="team.desc" v-model.trim="form.desc"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveInfo">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      dialogFormVisible: false,
      loading: false,
      infoVis: false,
      user: {
        id: '',
        avatar: ''
      },
      form: {
        name: '',
        desc: '',
        title: '',
        userId: ''
      },
      team: {
        name: '',
        desc: '',
        title: ''
      },
      formLabelWidth: '80px'
    }
  },
  created () {
    this.getInfo()
  },
  methods: {
    getInfo: function () {
      this.$http.get('api/user/info')
      .then(res => {
        var info = res.data.result
        this.form.userId = this.user.id = info._id
        this.user.avatar = info.avatar
        this.getTeamInfo()
      })
    },
    getTeamInfo: function () {
      this.$http.get('api/team/' + this.user.id)
        .then(res => {
          this.infoVis = true
          this.team = res.data
          this.loading = true
          setTimeout(() => { this.loading = false }, 500)
        }, res => {
          this.$message.error('还没有团队名片')
        })
    },
    saveInfo () {
      this.dialogFormVisible = false
      this.$http.post('api/team', this.form)
        .then(res => {
          this.$message.success('提交成功')
          this.getTeamInfo()
        }, res => {
          this.$message.error('操作失败')
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  .card-wrap
    width: 800px
    margin: 0 auto
    padding-top: 30px
    font-size: 14px
    .el-row
      margin-bottom: 10px
      &:last-child
        margin-bottom: 0
    .el-col
      padding:
        top: 10px
        bottom: 10px
  .edit-btn
    width: 100%
  .menu-left
    display: flex
    justify-content: center
    align-items: center
    flex-wrap: wrap
  .avatar
    display: block
    width: 128px
    height: 128px
    border-radius: 50%
    margin: 0 auto
  .info
    height: 194px
    display: flex
    justify-content: center
    align-items: center
    background: #EFF2F7
    color: #222
    font-size: 16px
  .bg-col
    background: #f1f2f3
    color: #222
    font-size: 14px
    .desc
      text-indent: 2em
</style>
