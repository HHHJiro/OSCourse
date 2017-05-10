<template>
  <div id="vdo-view">
    <div class="view-wrap">
      <div class="vdo-wrap">
        <p class="title"><el-tag type="primary">视频</el-tag><span class="title-text">银河护卫队2官方预告</span></p>
        <embed src="http://player.youku.com/player.php/sid/XMjU1Mjk3MTQ4MA==/v.swf" allowFullScreen='true' quality='high' width='960' height='630' align='left' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>
      </div>
      <div class="info-wrap">
        <p class="title info-tag"><el-tag type="success">视频信息</el-tag></p>
        <div class="info-text">
          <ul class="info-textag">
            <li><el-tag type="primary">观看：123</el-tag></li>
            <li><el-tag type="warning">留言：321</el-tag></li>
            <li><el-tag type="primary">上传者：Star Lord</el-tag></li>
            <li><el-tag type="warning">上传时间：1天前</el-tag></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="desc-wrap">
      <p class="desc-text"><span class="desc-tag"><el-tag type="primary">视频简介</el-tag></span>伴随着“劲歌金曲第二辑”的背景音乐，银河护卫队奔向更遥远宇宙星域，将穿越宇宙继续团队冒险之旅。护卫队成员们发现了“星爵”——彼得·奎尔（克里斯·帕拉特 饰）的身世之谜，他们必须要为他们的新家庭而战。随着漫威电影宇宙的扩张，从前的敌人将变成了新盟友，更多经典漫画中的人气角色将会为我们的英雄们伸出援手。</p>
    </div>
    <div class="hr"></div>
    <div class="comments-wrap">
      <p>留言模块</p>
      <ul>
        <li></li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
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
  

  .hr
    width: $leftGirdWth
    background: rgb(241, 242, 243)
    height: 20px
</style>
