<template>
  <div id="g-ctn">
    <div class="video-wrap">
      <div class="vdo-ttl">
        <img src="/static/img/video_ttl.png">
        <span><h2>视频</h2></span>
      </div>
      <div class="main-wrap">
        <div class="video-main">
          <a href="" class="link-img"><img src="/static/img/video_4.webp" alt=""></a>
          <div class="if-btm"><p class="des-vdo"><a href="">视频介绍</a></p></div>
        </div>
      </div>
      <div class="nml-wrap">
        <div class="video-nml" v-for="i in 6">
            <img src="/static/img/video_3.webp" alt="">
            <div class="if-btm"><p class="des-vdo">视频介绍</p></div>
            <a href="" class="link-img"><div class="mask-wrap">
              <div class="mask-bg"></div>
              <div class="vdo-mask"></div>
            </div></a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: '这里是首页的内容'
    }
  }
}
</script>

<style lang="sass" scoped>
  $vdoMainWth: 440px
  $vdoWrapHgt: 220px
  $vdoMainSpc: 20px
  $vdoNmlWth: 200px
  $vdoNmlHht: 100px
  $outerWth: 1160px
  $vdoIfHht: 35px
  $linkTextHover: 0 0 3px #fff
  $transSec: 0.6s
  #g-ctn
    width: $outerWth
    text-align: center
    img
      width: 100%
    .video-wrap
      width: $outerWth
      overflow: hidden
      .vdo-ttl
        display: flex
        justify-content: flex-start
        width: 100%
        height: 48px
        text-align: left
        margin-bottom: 10px
        img
          width: 48px
          height: 48px
        span
          line-height: 48px
          text-indent: 10px
          font-size: 28px
      .main-wrap
        position: relative
        float: left
        border-radius: 4px
        overflow: hidden
        .video-main
          width: $vdoMainWth
          height: $vdoWrapHgt
      .nml-wrap
        float: left
        display: flex
        flex-wrap: wrap
        justify-content: space-around
        align-items: center
        width: 700px
        height: $vdoWrapHgt
        margin-left: $vdoMainSpc
        .video-nml
          position: relative
          width: $vdoNmlWth
          height: $vdoNmlHht
          border-radius: 4px
          overflow: hidden
          &:hover .mask-wrap
            opacity: 1
          .if-btm
            height: 25px
            font-size: 12px
          .des-vdo
            color: #fff
            line-height: 25px
            height: 25px
          .mask-wrap
            transition: all $transSec
            opacity: 0
            .mask-bg
              background: rgba(0,0,0,0.7)
            .vdo-mask, .mask-bg
              position: absolute
              left: 0
              top: 0
              width: 100%
              height: 100%
            .vdo-mask
              background: url('/static/img/play.png') no-repeat
              background-position: center
  .if-btm
    position: absolute
    bottom: 0
    width: 100%
    height: $vdoIfHht
    text-align: left
    font-size: 14px
    background: linear-gradient(transparent,rgba(0,0,0,0.1) 20%,rgba(0,0,0,0.2) 35%,rgba(0,0,0,0.5) 65%,rgba(0,0,0,0.66))
    a:hover
      text-shadow: $linkTextHover
  .des-vdo
    height: $vdoIfHht
    line-height: $vdoIfHht
    text-indent: 20px
  .link-img
    display: block
</style>
