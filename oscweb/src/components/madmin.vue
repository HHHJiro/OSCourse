<template>
  <div class="admin">
    <p class="tag-wrap"><el-tag type="success">管理系统</el-tag></p>
    <el-tabs type="border-card" class="tabs-wrap">
      <el-tab-pane label="用户统计">用户统计</el-tab-pane>
      <el-tab-pane label="用户管理">用户管理</el-tab-pane>
      <el-tab-pane label="文件统计">文件统计</el-tab-pane>
      <el-tab-pane label="文件管理">文件管理</el-tab-pane>
    </el-tabs>
  </div>  
</template>
<script>
  export default {
    data () {
      return {
      }
    }
  }
</script>
<style lang="sass" scoped>
  .admin
    margin: 30px 0 0
    .tag-wrap
      padding: 10px 0
    .tabs-wrap
      min-height: 600px
</style>
