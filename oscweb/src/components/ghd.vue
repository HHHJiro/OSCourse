<template>
<div id="g-hd">
  <div id="hd-wrap">
    <div class="hd-top">
      <div class="mask-wrap">
        <div class="hd-mask"></div>
        <div class="mask-bg"></div>
      </div>
      <div class="hd-ctn">
        <h1 id="badge"><img src="/static/img/badge.png "><span class="os-course">操作系统课程网站</span></h1>
        <el-menu :default-active="activeIndex" class="el-menu-demo header-ul" mode="horizontal" @select="handleSelect" :router='true'>
          <el-menu-item index="/"  >首页</el-menu-item>
          <el-menu-item index="/2"  >文档</el-menu-item>
          <el-menu-item index="/3"  >视频</el-menu-item>
          <el-menu-item index="/4"  >讨论区</el-menu-item>
        </el-menu>
        <div class="login">
          <mlgn></mlgn>
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
      activeIndex: 'index',
      chroseText: '教学资料',
      select: '',
      search: '',
      searchfor: {},
      Auth: false,
      user: {}
    }
  },
  created () {
    const userInfo = this.getUserInfo() // 新增一个获取用户信息的方法
    if (userInfo != null) {
      this.user.id = userInfo.id
      this.user.name = userInfo.name
      this.Auth = true
    } else {
      this.id = ''
      this.name = ''
    }
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
    getUserInfo () { // 获取用户信息
      // const token = sessionStorage.getItem('user-token')
      // if (token != null && token != 'null') {
      //   let decode = jwt.verify(token,'OS-Course-Website') // 解析token
      //   return decode // decode解析出来实际上就是{name: XXX,id: XXX}
      // } else {
      //   return null
      // }
    }
  }
}
  </script>
  <style lang="sass" scoped>
  $topHt: 60px
  $topMarLR: 96px
  $topWdh: 1160px
  $ulWdh: 620px
  $ulMarLR: 40px
  $loginWth: 100px
  $liClr: rgba(255,255,255,0.8)
  $liHvrClr: rgba(255,255,255,0.24)
  $maskClr: rgb(5, 18, 26)
  
  #g-hd
    background: url('/static/img/hd_top.png') no-repeat
    background-size: auto 200%
    background-position: center
    background-color: $maskClr
  #hd-wrap
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
        background-size: auto 440px
        filter: blur(3px)
        background-position: center -99px
        z-index: 50
        padding: 0 20px
        background-color: $maskClr
      .mask-bg
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        background-color: rgba(255, 255, 255, 0.1)
        z-index: 100
  .hd-top
    position: relative
    height: $topHt
    width: 100%
    overflow: hidden
    background: #fff
    box-shadow: rgba(0,0,0,0.1) 0 1px 2px
    background-color: transparent
    .hd-ctn
      position: relative
      height: 100%
      width: $topWdh
      margin: 0 $topMarLR
      background: transparent
      z-index: 1000
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
    font-size: 30px
    display: flex
    justify-content: space-around
    align-items: center
    .os-course
      height: 60px
      line-height: 60px
      color: rgb(80, 191, 255)
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
