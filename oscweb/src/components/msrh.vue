<template>
  <el-input class="srh-box" :placeholder="holderText" icon="search" v-model="srhText" @keyup.enter.native="srhHandle" :on-icon-click="srhHandle">
</el-input>
</template>
<script>
export default {
  data () {
    return {
      srhText: '',
      holderText: '输入要搜索的内容'
    }
  },
  methods: {
    srhHandle: function () {
      var self = this
      this.$message({
        message: `搜索：${self.srhText}`,
        type: 'success'
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .srh-box
    width: 240px
</style>
