<template>
  <el-autocomplete
  popper-class="my-autocomplete"
  v-model="srhText"
  :fetch-suggestions="querySearch"
  custom-item="my-item-zh"
  placeholder="请输入内容"
  @select="srhHandle"
  @keyup.enter.native="srhHandle"
  icon="search"
  :on-icon-click="handleIconClick"
></el-autocomplete>
</template>
<script>
import Vue from 'vue'
Vue.component('my-item-zh', {
  functional: true,
  render: function (h, ctx) {
    var item = ctx.props.item
    return h('li', ctx.data, [
      h('div', { attrs: { class: 'name' } }, [item.name]),
      h('span', { attrs: { class: 'desc' } }, [item.desc])
    ])
  },
  props: {
    item: { type: Object, required: true }
  }
})
export default {
  data () {
    return {
      srhText: '',
      holderText: '输入要搜索的内容',
      files: null,
      timeout: null
    }
  },
  methods: {
    srhHandle (item) {
      this.srhText = item.name ? item.name : this.srhText
      this.$message({
        message: `搜索：${this.srhText}`,
        type: 'success'
      })
      this.$router.push('/search?q=' + this.srhText)
    },
    loadAll () {
      this.$http.get('api/search/tips')
        .then(res => {
          this.files = res.data
        })
    },
    querySearch (queryString, cb) {
      var files = this.files
      var results = queryString ? files.filter(this.createStateFilter(queryString)) : files
      cb(results)
    },
    createStateFilter (queryString) {
      return (files) => {
        return (files.name.indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleIconClick (ev) {
      console.log(ev)
    }
  },
  mounted () {
    this.loadAll()
  }
}
</script>

<style lang="sass">
  .my-autocomplete
    li
      line-height: normal
      padding: 7px
      .name
        height: 25px
        text-overflow: ellipsis
        overflow: hidden
      .desc
        height: 20px
        font-size: 12px
        color: #b4b4b4
      .highlighted .desc
        color: #ddd
</style>
