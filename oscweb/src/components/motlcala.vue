<template>
  <div class="otlcala-wrap">
    <ul class="card-wrap">
      <li class="file-card" v-for="file in files">
        <el-card :body-style="{ padding: '0px' }">
        <img src="/static/img/word.png" class="image">
          <div style="padding: 14px;background: #F9FAFC">
            <p class="download-wrap">
              <el-tooltip class="item" effect="light" :content="file.name" placement="top-start">
                <router-link  :to="'/file/' + file._id" >{{ file.name }} </router-link>
              </el-tooltip>
              <el-button type="success" class="download" size="small">下载</el-button>
            </p>
            <div class="bottom clearfix">
              <time class="time">{{ file.meta.createAt | formDate}}</time>
              <span>{{ file.desc }}</span>
            </div>
          </div>
        </el-card>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        path: '',
        files: []
      }
    },
    watch: {
      '$route': 'getType'
    },
    created () {
      this.getType()
    },
    methods: {
      getType () {
        this.path = this.$route.path.substr(1)
        this.getInfo()
      },
      getInfo () {
        this.$http.get('api/files/' + this.path)
        .then(res => {
          this.files = res.data.resrouces
        }, res => {
          console.log('wrong')
        })
      }
    }
  }
</script>
<style lang="sass" scoped>
  .card-wrap
    width: 800px
    margin: 80px auto 0
    display: flex
    flex-wrap: wrap
    justify-content: space-around
    .file-card
      width: 300px
      .image 
        width: 128px
        display: block
        margin: 15px auto 0
      .time 
        font-size: 12px
        color: #999
      .download-wrap
        height: 30px
        line-height: 30px
      .download
        float: right
  .clearfix:before,
  .clearfix:after
    display: table
    content: ""
  .clearfix:after
    clear: both
  .bottom
    margin-top: 13px
    font-size: 14px
    color: #475669
    min-height: 36px
  a
    color: #222
    display: inline-block
    max-width: 210px
    overflow: hidden
    white-space: nowrap
    text-overflow: ellipsis
    &:hover
      text-decoration: underline
</style>
