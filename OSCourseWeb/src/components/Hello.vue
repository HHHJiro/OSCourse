<template>
<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router='true'>
  <el-menu-item index="/"  >首页</el-menu-item>
  <el-submenu index='/'  >
    <template slot="title" >{{chroseText}}</template>
    <el-menu-item v-for="chrose in chroses" :key="chrose.key" :index="chrose.key"  >{{chrose.contentText}}</el-menu-item>
  </el-submenu>
  <el-menu-item index="/login" >登录</el-menu-item>
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
    created:function(){
     
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