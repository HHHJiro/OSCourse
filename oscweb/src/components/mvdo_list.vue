<template>
  <div class="teach">
    <div class="video-wrap">
      <ul class="items-wrap item-vdo">
        <li v-for="item in videos" class="item-in">
        <div class="item-wrap">
          <div class="vdo-hd">
            <div class="avatar"><img :src="item.uploadBy.avatar" alt="avatar"></div>
            <span class="auth-name">{{item.uploadBy.nickName}}</span>
            <span class="upload-time">{{item.meta.updateAt | formDate}}</span>
          </div>
          <div class="vdo-ctn">
             <router-link :to="'/video/' + item._id" :video="item.name">
              <h2 class="title">{{item.name}}</h2>
             </router-link>
            <p class="desc">{{item.desc}}</p>
          </div>
          <div class="vdo-ft">
            <el-tag type="success">教学视频</el-tag>
            <img src="/static/img/play.png" class="icon icon-wth">
            <span class="num num-wth">{{item.pv}}</span>
            <img src="/static/img/download.png" class="icon icon-dwn">
            <span class="num num-dwn">{{item.download}}</span>
          </div>
        </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        videos: [],
        type: '',
        types: {
          'teach': 'teachVdo',
          'micro': 'micro'
        },
        path: ''
      }
    },
    mounted () {
      // var self = this
      // var type = this.types[this.path]
      // this.$http.get('api/resource/' + type)
      //   .then(res => {
      //     self.videos = res.data.resrouces
      //   }, res => {
      //     console.log('wrong')
      //   })
    },
    created () {
      this.getType()
    },
    watch: {
      '$route': 'getType'
    },
    methods: {
      getType () {
        this.path = this.$route.path.split('/').pop()
        this.getInfo()
        // console.log(this.$route.path.split('/').pop())
      },
      getInfo () {
        var self = this
        var type = this.types[this.path]
        this.$http.get('api/resource/' + type)
          .then(res => {
            self.videos = res.data.resrouces
          }, res => {
            console.log('wrong')
          })
      }
    }
  }
</script>
<style lang="sass" scoped>
  $baseClr: rgb(47, 47, 47)
  $time: rgb(150, 150, 150)
  $ftClr: rbf(180, 180, 180)
  .teach
    display: flex
    justify-content: center
    color: $baseClr
    .items-wrap
      width: 850px
      display: flex
      justify-content: space-between
      flex-flow: row wrap
      .item-in
        height: 200px
        width: 400px
        border: 1px solid #EFF2F7
        border-radius: 8px
        margin: 10px 0
      .item-wrap
        width: 360px
        margin: 0 auto
        .vdo-hd
          width: 100%
          height: 40px
          display: flex
          justify-content: flex-start
          align-items: center
          font-size: 13px
          .avatar
            width: 32px
            heignt: 32px
            margin: 0 5px
            img
              border-radius: 50%
          .auth-name
            margin: 0 5px
          .upload-time
            color: $time
            margin: 0 5px
        .vdo-ctn
          height: 100px
          .title
            font-size: 18px
            line-height: 27px
            color: $baseClr
            &:hover
              color: #58B7FF
          .desc
            width: 100%
            white-space: pre-wrap
            height: 70px
        .vdo-ft
          height: 40px
          padding-bottom: 20px
          display: flex
          justify-content: flex-start
          align-items: center
          .icon
            width: 18px
            margin: 0 10px
          .num
            font-size: 12px
  img
    width: 100%
</style>
