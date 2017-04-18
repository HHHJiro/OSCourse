<template>
<header id="header">
  <div id="header-wrap">
    <h1 id="badge"><img src="/static/img/badge.png "><span class="os-course">操作系统课程网站</span></h1>
    
    <el-menu :default-active="activeIndex" class="el-menu-demo header-ul" mode="horizontal" @select="handleSelect" :router='true'>
        <el-menu-item index="/"  >首页</el-menu-item>
        <el-menu-item index="/1"  >文档</el-menu-item>
        <el-menu-item index="/2"  >视频</el-menu-item>
        <el-menu-item index="/3"  >讨论区</el-menu-item>
        <template v-if="!Auth">
          <el-menu-item index="/login" class="right-btn">登录</el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="/login" >{{user.name}}同学</el-menu-item>
        </template>
    </el-menu>
  </div>
  <div class="search-box">
    <div class="hd-search">
        <el-input v-model="search" id="search-input" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="search" class="search-btn"  @click="onSearch">搜索</el-button>
    </div>  
  </div>
</header><!-- /header -->

</template>

<script>
 export default {
    data() {
      return {
        activeIndex: this.$route.path,
        chroseText:"教学资料",
        select: '',
        search: '',
        title:this.$route.path,
        searchfor:{},
        Auth:false,
        user:{}
      }
    },
    created(){
      const userInfo = this.getUserInfo(); // 新增一个获取用户信息的方法
      if(userInfo != null){
        this.user.id = userInfo.id;
        this.user.name = userInfo.name;
        this.Auth = true
      }else{
        this.id = '';
        this.name = ''
      }
    },
    computed:{

    },
    methods: {
      handleSelect(key, keyPath) {
        // console.log(key, keyPath);
      },
      onSearch:function(){
        this.$message({
          message: '搜索'+this.search,
          type: 'success'
        })
      },
      getUserInfo(){ // 获取用户信息
      const token = sessionStorage.getItem('user-token');
      if(token != null && token != 'null'){
        let decode = jwt.verify(token,'OS-Course-Website'); // 解析token
        return decode // decode解析出来实际上就是{name: XXX,id: XXX}
      }else {
        return null
      }
    }
  }
}
  </script>
  <style lang="stylus" scoped>
  * {
    font-family: "Arial","Microsoft YaHei","宋体","黑体",sans-serif;
    margin: 0;
    padding: 0;
  }
   #header {
    height: 60px;
    color: rgba(255,255,255,0.9);
    background: #1c2026;
   }
   #header-wrap {
    width: 1160px;
    margin: 0 96px;
    padding: 0 20px;
    overflow: hidden;
    }
   .header-ul {
    float: right;
    width: 720px;
    height: 60px;
    margin: 0 40px;
   }
   .header-ul > li, div {
     height: 60px;
     line-height: 60px;
     border-bottom: none;
     color: rgba(255,255,255,0.7);
   }
   .el-menu {
    background: transparent;
   }
   .header-ul > li:hover, .is-active{
    background-color: #444;
    border-bottom: none;
   }
    #badge {
      float: left;
      width: 340px;
      font-size: 30px;
    }
    #badge >img{
      float: left;
      width: 60px;
      line-height: 60px;
      color: #000;
    }
    .demo-form-inline {
      height: 60px;
      margin: 0;
    }
     .el-select{
     width: 105px;
    }
    .el-input{
      width: 200px;
    }
    .el-menu-item:last-child {
      position: absolute;
      right: 0;
    }
    .search-box {
      position: relative;
      height: 160px;
      background: url('/static/img/hd_search.png') no-repeat;
      background-size: 30%;
      background-color: #120f0b;
      background-position: 50% 30px;
    }
    .hd-search {
      position: absolute;
      bottom: 10%;
      left: 60%;
    }
    #header #earch-input {
      border: 1px solid #324057;
      background-color: #000;
    }
    .search-input:focus {
      border-color: #000;
    } 
    .search-btn {
      background-color: #000;
      border: 1px solid #99A9BF;
    }
    .search-btn:hover {
      background-color: #475669;
      border-color:#D3DCE6
    }
  </style>