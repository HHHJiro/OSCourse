<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router='true'>
  <el-menu-item index="/"  >首页</el-menu-item>
  <el-submenu index='/'  >
    <template slot="title" >{{chroseText}}</template>
    <el-menu-item v-for="chrose in chroses" :key="chrose.key" :index="chrose.key"  >{{chrose.contentText}}</el-menu-item>
  </el-submenu>
  <template v-if="!Auth">
    <el-menu-item index="/login" >登录</el-menu-item>
  </template>
  <template v-else>
    <el-menu-item index="/login" >{{user.name}}同学</el-menu-item>
  </template>
    <el-form :inline="true" :model="searchfor" class="demo-form-inline">
      <el-form-item class="form-search">  
        <el-input v-model="search" placeholder="请输入内容"></el-input>
        <el-button type="primary" icon="search" @click="onSearch">搜索</el-button>
      </el-form-item>  
    </el-form>
</el-menu>

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
        user:{},
        chroses:
          [
            {
              key:"/file",
              contentText:"文档"
            },
            {
              key:"/video",
              contentText:"视频"
            },
            {
              key:"/comments",
              contentText:"讨论区"
            }
          ]
      };
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