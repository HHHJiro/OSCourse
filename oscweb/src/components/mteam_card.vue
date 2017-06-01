<template>
  <div class="team-card">
    <div class="card-wrap">
    <el-row>
      <el-col :span="6">
        <el-row>
          <img class="avatar" src="/static/img/avatar/default.png">
        </el-row>
        <el-row>
          <el-col :span="20" :offset="2">
            <el-button class="edit-btn" type="success" @click="dialogFormVisible = true">编辑</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16">
            <el-row :gutter="20">
        <el-col :span="6">
        <div><strong>姓名</strong></div>
        </el-col>
        <el-col :span="18">
        <div><strong>HHH</strong></div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
        <div><strong>职称</strong></div>
        </el-col>
        <el-col :span="18">
        <div>副教授</div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
        <div><strong>个人简介</strong></div>
        </el-col>
        <el-col :span="16">
        <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        </div>
        </el-col>
      </el-row>
      </el-col>
    </el-row>
    <el-dialog title="团队信息" :visible.sync="dialogFormVisible" size="tiny">
      <el-form :model="form" label-width="80px" label-position="top">
        <el-form-item label="姓名">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="选择职称">
          <el-select v-model="form.jobTit" placeholder="职称">
            <el-option label="助教" value="j1"></el-option>
            <el-option label="讲师" value="j2"></el-option>
            <el-option label="副教授" value="j3"></el-option>
            <el-option label="教授" value="j4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="简介">
          <el-input type="textarea" v-model="form.desc" rows="3"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
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
      form: {
        name: '',
        desc: '',
        jobTit: ''
      },
      formLabelWidth: '80px'
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
</style>
