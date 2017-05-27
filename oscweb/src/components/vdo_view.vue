<template>
  <div id="vdo-view">
    <div class="show-wrap">
      <div class="doc-view" v-if="isDoc">
        <p class="title"><el-tag type="primary">资源名</el-tag><span class="title-text">{{video.name}}</span></p>
        <iframe :src="'https://docs.google.com/viewer?url=http://opsbja25o.bkt.clouddn.com/'+video.docPath+'&embedded=true'" width="960" height="630" style="border: none;"></iframe>
      </div>
      <div class="view-wrap" v-else>
        <div class="vdo-wrap">
          <p class="title"><el-tag type="primary">视频</el-tag><span class="title-text">{{video.name}}</span></p>
          <video width="960" height="630" controls autoplay preload>
            <source :src="video.path" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        <div class="info-wrap">
          <p class="title info-tag"><el-tag type="success">资源信息</el-tag></p>
          <div class="info-text">
            <ul class="info-textag">
              <li><el-tag type="primary">观看：{{video.pv}}</el-tag></li>
              <!-- <li><el-tag type="warning">留言：321</el-tag></li> -->
              <li><el-tag type="primary">上传者：{{video.uploadBy.nickName}}</el-tag></li>
              <li><el-tag type="warning">上传时间：{{video.meta.createAt | formDate}}</el-tag></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="desc-wrap">
        <p class="desc-text"><span class="desc-tag"><el-tag type="primary">简介</el-tag></span>{{video.desc}}</p>
      </div>
<!--     <div class="hr"></div>
    <div class="comments-wrap">
      <p>留言模块</p>
      <ul>
        <li></li>
      </ul>
    </div> -->
  </div>
</template>
<script>
export default {
  data () {
    return {
      video: null,
      isDoc: false
    }
  },
  created () {
    this.getInfo()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'getInfo'
  },
  methods: {
    getInfo () {
      var id = this.$route.params.id
      this.$http.get('api/file/' + id)
        .then(res => {
          this.video = res.data.video
          this.isDoc = res.data.fileType === 'doc'
          this.video.docPath = this.video.path.split('/').pop()
        }, res => {
          this.$message.error('失败' + res)
        })
    }
  }
}
</script>
<style lang="sass" scoped>
  $titleSize: 20px
  $infoSize: 16px
  $descSize: 14px
  $descClr: #999
  $leftGirdWth: 960px
  #vdo-view
    padding:
      bottom: 200px
    overflow: hidden
    .view-wrap
      display: flex
      justify-content: space-between
      align-items: flex-start
      .vdo-wrap
        width: $leftGirdWth
    .title
      height: 36px
      font-size: $titleSize
      display: flex
      align-items: center
      .title-text
        line-height: 36px
        margin:
          left: 10px
      padding:
        bottom: 10px
  .info-wrap
    width: 150px
    margin-top: 150px
    .info-tag
    .info-text
      padding:
        top: 50px
      font-size: $infoSize
      p
        text-indent: 2em
      .info-textag > li
        margin:
          bottom: 10px
  .desc-wrap
    width: $leftGirdWth
    padding: 10px 0
    .desc-text
      font-size: $descSize
      color: $descClr
      .desc-tag
        margin:
          right: 10px
  .comments
    width: $leftGirdWth
  
  .show-wrap
    display: flex
    justify-content: space-between
    align-items: flex-start
  .hr
    width: $leftGirdWth
    background: rgb(241, 242, 243)
    height: 20px
</style>
