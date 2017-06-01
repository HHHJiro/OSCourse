<template>
<div id="g-hd">
  <div class="hd-wrap">
    <div class="hd-top">
      <div class="mask-wrap">
        <div class="hd-mask"></div>
        <div class="mask-bg"></div>
      </div>
      <div class="hd-ctn">
        <h1 id="badge"><img src="/static/img/badge.png "><span class="os-course">操作系统教学平台</span></h1>
        <el-menu :default-active="activeIndex" class="el-menu-demo header-ul" mode="horizontal" @select="handleSelect" :router='true'>
          <el-menu-item index="/" >首页</el-menu-item>
          <el-submenu index="/video" class="no-btmbdr">
            <template slot="title" class="sub-tit">视频</template>
            <el-menu-item index="/resource/video">教学视频</el-menu-item>
            <el-menu-item index="/resource/micro">师生微课</el-menu-item>
          </el-submenu>
          <el-menu-item index="/outline" >教学大纲</el-menu-item>
          <el-menu-item index="/team" >教学团队</el-menu-item>
          <el-menu-item index="/teach" >教学资源</el-menu-item>
          <el-menu-item index="/cala" >教学日历</el-menu-item>
<!--           <el-menu-item index="/community" @click="getInfo">讨论区</el-menu-item> -->
        </el-menu>
        <div class="login">
          <mlgn :isAuth="isAuth"></mlgn>
        </div> 
      </div>
    </div>
    <div class="hd-btm">
      <div class="search-box">
      <msrh class="m-srh"></msrh>
      </div>
    </div>
  </div>
</div>

</template>

<script>
import msrh from '@/components/msrh'
import mlgn from '@/components/mlgn'
export default {
  components: {
    msrh,
    mlgn
  },
  data () {
    return {
      activeIndex: this.$route.path,
      select: '',
      search: '',
      funs: '',
      searchfor: {},
      isAuth: {},
      user: {}
    }
  },
  watch: {
    activeIndex: function () {
      console.log(window.location.href)
    }
  },
  created () {
    this.getInfo()
  },
  computed: {
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(key, keyPath);
    },
    onSearch: function () {
      this.$message({
        message: '搜索' + this.search,
        type: 'success'
      })
    },
    getInfo: function () {
      const self = this
      this.$http.get('api/user/info')
      .then(res => {
        var data = res.data.result
        self.$set(self.isAuth, 'auth', true)
        self.$set(self.isAuth, 'user', data)
      }, res => {
        console.log('oh noAuth')
        window.localStorage.removeItem('osc-access-token')
      })
    }
  }
}
  </script>
  <style lang="sass" scoped>
  $topHt: 60px
  $topMarLR: 96px
  $topWdh: 1160px
  $ulWdh: 620px
  $ulMarLR: 15px
  $loginWth: 100px
  $liClr: #222
  $liHvrClr: rgba(255,255,255,0.24)
  $maskClr: rgb(5, 18, 26)
  
  #g-hd
    background: url('/static/img/hd_top.png') no-repeat
    background-size: 100% 
    background-position: center -86px
    background-color: $maskClr
  .hd-wrap
    position: relative
    .mask-wrap
      position: absolute
      left: 0
      top: 0
      height: $topHt
      width: 100%
      background-color: #fff
      overflow: hidden
      .hd-mask
        position: absolute
        left: -20px
        top: -10px
        width: 100%
        height: 110px
        background: url('/static/img/hd_top.png') no-repeat
        background-size: 100%
        filter: blur(5px)
        background-position: center -81px
        z-index: 10
        padding: 0 20px
        background-color: $maskClr
      .mask-bg
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: rgba(255, 255, 255, 0.1)
        z-index: 20
  .hd-top
    position: relative
    height: $topHt
    width: 100%
    background: #fff
    box-shadow: rgba(0,0,0,0.1) 0 1px 2px
    background-color: transparent
    .hd-ctn
      position: relative
      height: 100%
      width: $topWdh
      margin: 0 $topMarLR
      background: transparent
      z-index: 30
      zoom: 1
    .header-ul
      float: left
      width: $ulWdh
      height: $topHt
      margin: 0 $ulMarLR
      & > li, div 
        height: $topHt
        line-height: $topHt
        border-bottom: none
        color: $liClr
      & > li:hover, .is-active
        background-color: $liHvrClr
        border-bottom: none


  .el-menu
    background: transparent
   
  #badge
    float: left
    width: 340px
    font-size: 28px
    display: flex
    justify-content: space-around
    align-items: center
    .os-course
      height: 60px
      line-height: 60px
      color: #870101
    & > img
      float: left
      width: 48px
      height: 48px
      line-height: 60px
      color: #000
    
  .demo-form-inline 
    height: 60px
    margin: 0

  .search-box 
    position: relative
    height: 160px
  .m-srh 
    position: absolute
    bottom: 20px
    right: 136px
    
  .login
    float: right
    width: $loginWth
    height: $topHt
</style>
