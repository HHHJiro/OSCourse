<template>
  <div id="add">
    <div class="steps-wrap">
      <el-steps :space="200" :active="stepAtv" finish-status="success" :align-center="alignStep" :center="alignStep">
        <el-step :title="stepFir"></el-step>
        <el-step :title="stepSec"></el-step>
        <el-step :title="stepThr"></el-step>
      </el-steps>
      <div class="step-div step_1">
        <ul class="oper">
          <li @click="addDoc">
            <p><img src="/static/img/atl_ttl.png">添加教学文档</p>
            <img class="add" src="/static/img/add.png">
          </li>
          <li @click="addVdo">
            <p><img src="/static/img/video_ttl.png">添加教学视频</p>
            <img class="add" src="/static/img/add.png">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        alignStep: true,
        stepAtv: 0,
        stepFir: '选择操作',
        stepSec: '填写表单',
        stepThr: '提交表单'
      }
    },
    methods: {
      addDoc: function () {
        this.stepAtv = 1
        this.stepFir = '添加文档'
      },
      addVdo: function () {
        this.stepAtv = 1
        this.stepFir = '添加视频'
      }
    }
  }
</script>
<style lang="sass" scoped>
  .steps-wrap
    margin-top: 20px
    .step-div
      width: 800px
      overflow: hidden
      margin: 30px auto 0
    .step_1 
      .oper
        display: flex
        justify-content: space-around
        padding-bottom: 10px
        li
          position: relative
          width: 300px
          height: 300px
          background: #13CE66
          border-radius: 10px
          overflow: hidden
          color: #222
          font-size: 24px
          transition: all .4s ease-in-out
          box-shadow: 5px 5px 3px #888888
          &:hover
            cursor: pointer
            color: #fff
            .add
              transform: rotate(270deg)
          p
            text-align: center
            padding: 30px 0 0
            img
              vertical-align: middle
              margin:
                right: 10px
          .add
            position: absolute
            left: 50%
            top: 50%
            width: 90px
            transition: all .4s ease-in-out
            margin:
              left: -45px
              top: -45px
            transform: rotate(45deg)
</style>
