<template>
  <div id="homepage">
    <div class="page-hd" v-if="infoShow">
      <div class="hd-left"><img :src="user.avatar" alt="avatar"></div>
      <div class="hd-right">
        <ul>
          <li class="name">昵称：{{user.nickName}}</li>
          <li>权限：<el-tag type="success">{{user.role | roleFormat}}</el-tag></li>
          <li>年龄：<el-tag type="primary">{{user.meta.createAt | formDate}}</el-tag></li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        user: '',
        infoShow: false
      }
    },
    created () {
      var self = this
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
    }
  }
</script>
<style lang="sass" scoped>
  $norSize: 14px
  $medSize: 16px
  $larSize: 18px
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
        width: 80px
    .hd-right
      width: 300px
      .name
        font-size: $larSize
      li
        margin-bottom: 10px
</style>
