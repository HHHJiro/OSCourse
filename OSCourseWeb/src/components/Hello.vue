<template>
<header id="header">
  <div id="header-wrap">
    <h1 id="badge"><img src="/static/img/badge.png ">操作系统课程网站</h1>
    
    <el-menu :default-active="activeIndex" class="el-menu-demo header-ul" mode="horizontal" @select="handleSelect" :router='true'>
        <el-menu-item index="/"  >首页</el-menu-item>
        <el-menu-item index="/1"  >文档</el-menu-item>
        <el-menu-item index="/2"  >视频</el-menu-item>
        <el-menu-item index="/3"  >讨论区</el-menu-item>
        <template v-if="!Auth">
          <el-menu-item index="/login" >登录</el-menu-item>
        </template>
        <template v-else>
          <el-menu-item index="/login" >{{user.name}}同学</el-menu-item>
        </template>
    </el-menu>
    <div class="header-search">
        <el-input v-model="search" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="search" @click="onSearch">搜索</el-button>
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
    height: 80px;
   }
   #header-wrap {
    display: flex;
    margin: 0 96px;
    padding: 0 20px;
    }
   .header-ul {
    flex-grow: 1
    height: 80px;
    background: transparent;
   }
   .header-ul > li, div {
     height: 80px;
     line-height: 80px;
   }
    #badge {
      font-size: 30px;
    }
    #badge >img{
      float: left;
      width: 60px;
      line-height: 80px;
      color: #000;
      margin-top: 15px;
      margin-left: 20px;
      margin-right: 20px;
    }
    .demo-form-inline {
      height: 80px;
      margin: 0;
    }
    .header-search {
      flex-grow: 1
    }
    .el-menu-demo{
      padding-left: 55px;
    }
     .el-select{
     width: 105px;
    }
    .el-input{
      width: 200px;
    }
  </style>