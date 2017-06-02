<template>
  <div class="team">
    <ul class="teams-wrap">
      <li class="team-card" v-for="item in teams">
      <div class="left-wrap">
        <p><img :src="item.userId.avatar" alt="ava"></p>
        <p class="name"><strong>{{item.name}}</strong></p>
      </div>
      <div class="right-wrap">
      <p class="item item-id"><span class="tag-wrap"><el-tag type="gray">平台ID</el-tag></span>{{item.userId.nickName}}</p>
      <p class="item item-title"><span class="tag-wrap"><el-tag type="gray">职称</el-tag></span><el-tag type="success">{{item.title | teamTitle}}</el-tag></p>
      <p class="item item-desc"><span class="tag-wrap"><el-tag type="gray">个人简介</el-tag></span>{{item.desc}}</p>
      </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        teams: []
      }
    },
    created () {
      this.$http.get('api/teams')
        .then(res => {
          this.teams = res.data
        })
    }
  }
</script>
<style lang="sass" scoped>
  .team
    min-height: 800px
    .teams-wrap
      min-width: 780px
      width: 780px
      margin: 0 auto
      display: flex
      padding: 30px
      justify-content: space-between
      align-items: center
      flex-wrap: wrap
      align-content: space-around
      .team-card
        width: 350px
        height: 200px
        margin: 10px 0
        border-radius: 8px
        background: #EFF2F7
        box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.32), 0 0 6px 0 rgba(0, 0, 0, 0.14)
        display: flex
        font-size: 14px
        color: #222
        .left-wrap
          height: 100%
          float: left
          img
            width: 100px
            height: 100px
            padding: 0 10px
            border-radius: 50%
            display: block
            margin: 20px auto 0
          .name
            padding: 20px 0 0 
            text-align: center
            font-size: 16px
        .right-wrap
          float: left
          width: 100%
          .item
            padding: 10px 0 10px 10px
            &:first-child
              margin-top: 20px
          .tag-wrap
            display: inline-block
            width: 80px
          .item-desc
            line-height: 24px
            max-width: 210px
            display: -webkit-box
            -webkit-box-orient: vertical
            -webkit-line-clamp: 3
            overflow: hidden
</style>
