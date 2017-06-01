<template>
  <div id="user-info">
    <div class="info-menu">
      <el-dropdown trigger="click" menu-align="start" @command="handleCommand">
      <span class="el-dropdown-link avatar-box">
          <div class="avatar"><img :src="user.avatar" alt="avatar"></div>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="add">我要上传</el-dropdown-item>
          <el-dropdown-item command="homepage">我的主页</el-dropdown-item>
          <template v-if="user.role>=50">
            <el-dropdown-item command="admin">系统管理</el-dropdown-item>
          </template>
          <template v-if="user.role>=10 && user.role<50">
            <el-dropdown-item command="teamcard">团队名片</el-dropdown-item>
          </template>
          <el-dropdown-item command="quit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: ['user'],
  data () {
    return {
    }
  },
  mounted: function () {
  },
  methods: {
    handleCommand (command) {
      var self = this
      switch (command) {
        case 'quit':
          this.commandQuit()
          break
        case 'homepage':
          this.$router.push('/user/' + self.user.id)
          break
        case 'add':
          this.$router.push('/res/add')
          break
        case 'teamcard':
          this.$router.push('/teamcard')
          break
      }
    },
    commandQuit () {
      localStorage.clear()
      this.$parent.quit()
      this.$router.push('/')
    }
  }
}
</script>
<style lang="sass" scoped>
  #user-info
    width: 100%
    height: 100%
    display: flex
    justify-content: center
    align-items: center
    .avatar-box
      display: flex
      justify-content: center
      align-items: center
      &:hover
        cursor: pointer
      .avatar
        width: 30px
        img
          width: 100%
</style>
