<template>
  <el-row :gutter="20" >
    <el-col :sm="{span:4,offset:5}" :xs="{span:16,offset:4}">
      <img src="../assets/logo.png" width="100%">
    </el-col>
    <el-col :sm="2" :xs="8" class="alignright">
      <p><strong>用户</strong></p>
      <p><strong>昵称</strong></p>
    </el-col>
    <el-col :sm="{span:5}" :xs="14" class="alignleft">
      <p class="tall"><strong>HHH</strong></p>
      <p><strong>{{sname}}</strong><i class="el-icon-edit" @click="edit=!edit">编辑</i></p>
      <template v-if="edit">
        <el-input v-model="sname" placeholder="请输入内容"></el-input>
      </template>
    </el-col>
  </el-row>
</template>

<script>
    export default {
    data() {
        return {
          sname:"辉哥帅过金城武",
          edit:false
        }
    },
    methods:{
      edit:function(){}
      }
    }
</script>
<style type="text/css" scoped>
  i{
    float: right;
    margin-left: 20px;
    font-size: 0.8em;
    padding: 5px;
    border-radius: 5px;
  }
  i:hover{
    color: #20A0FF;
    cursor: pointer;
    background-color: #E5E9F2;
  }
  .tall{
    height: 21px;
    line-height: 21px;
  }
  .alignleft{
    text-align: left;
  }
  .alignright{
    text-align: right;
  }
</style>