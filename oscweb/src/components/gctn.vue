<template>
  <div id="g-ctn">
    <div class="video-wrap">
      <div class="vdo-ttl ttl">
        <div class="ttl-img"><img src="/static/img/video_ttl.png"></div>
        <span><h2>视频</h2></span>
        <div class="more-link"><a>更多 ></a></div>
      </div>
      <div class="main-wrap">
        <div class="video-main">
          <a href="" class="link-img"><img src="/static/img/video_4.webp" alt=""></a>
          <div class="if-btm"><p class="des-vdo"><a href="">视频介绍</a></p></div>
          <div class="vdo-more"><a href=""><span class="more-wrap">更多 ></span></a></div>
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
    <div class="atl-wrap">
      <div class="atl-ttl ttl">
        <div class="ttl-img"><img src="/static/img/atl_ttl.png"></div>
        <span><h2>文章</h2></span>
        <div class="more-link"><a>更多 ></a></div>
      </div>
      <div class="atl-list">
        <ul class="atl-nodes">
          <li class="atl-node" v-for="item in 5">
            <div class="atl-info">
              <div class="atl-hd">
                <div class="auth">
                  <div class="auth-img"><img src="/static/img/user_default.png" alt=""></div>
                  <span class="icon-mrnrt">作者名</span><i class="el-icon-time"></i><span class="icon-mrnrt">30分钟前</span>
                  </div>
              </div>
              <div class="atl-ctn">
                <div class="atl-des">
                  <p class="des-ttl">title</p>
                  <p class="des-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                  quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo</p>
                </div>
                <div class="atl-img"><img src="/static/img/hd_search.png" alt=""></div>
              </div>
              <div class="atl-ft">
                <el-tag type="success">文章</el-tag>
                <div class="ft-wths"><img src="/static/img/watch.png" alt=""></div><span class="icon-mrnrt">123</span>
                <div class="ft-msgs"><img src="/static/img/message.png" alt=""></div><span class="icon-mrnrt">321</span>
              </div>
            </div>
          </li>
        </ul>
        <div class="ranks-wrap">
          <p class="rank-name">
            <el-badge value="hot" class="item">
              <span class="rank-ttl-text">排行</span>
            </el-badge>
          </p>
          <ul class="atl-ranks">
            <li class="atl-rank" v-for="(item,index) in 8">
              <el-tag :type="index > 2 ? 'gray' : 'danger'">{{index + 1}}</el-tag>
              <span class="rank-ttl">文章标题</span>
            </li>
          </ul>
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
  $ttlHht: 36px
  $ttlImgWth: 36px
  $defaultMarBtm: 10px 
  $mMarBtm: 35px
  $iconMarRt: 10px
  $iconMarLt: 5px
  $iconColor: #969696
  #g-ctn
    width: $outerWth
    text-align: center
    img
      width: 100%
    a:hover
      text-shadow: $linkTextHover
    .video-wrap
      width: $outerWth
      overflow: hidden
      margin-bottom: $mMarBtm
      .main-wrap
        position: relative
        float: left
        border-radius: 4px
        overflow: hidden
        .video-main
          position: relative
          width: $vdoMainWth
          height: $vdoWrapHgt
          &:hover .vdo-more
            opacity: 1
          .vdo-more
            transition: all $transSec
            opacity: 0
            position: absolute
            display: flex
            justify-content: flex-end
            bottom: 35px
            width: 100%
            height: 20px
            line-height: 20px
            font-size: 14px
            .more-wrap
              background: rgba(0,0,0,0.64)
              padding: 3px 5px
              border-radius: 4px
              margin-right: 20px
              
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
              border-radius: 4px
            .vdo-mask
              background: url('/static/img/play.png') no-repeat
              background-position: center
  .atl-list
    display: flex
    justify-content: space-around
    align-items: flex-start
    text-align: left
    .rank-name
      height: 30px
      margin: 20px 0
      .rank-ttl-text
        font-size: 18px
        width: 30px
        height: 30px
        line-height: 30px
    .atl-ranks
      width: 200px
      font-size: 14px
      .atl-rank
        height: 30px
        margin-bottom: 5px
        .rank-ttl
          display: inline-block
          text-indent: 10px
    .atl-nodes
      width: 800px
    .atl-node
      height: 200px
      margin-bottom: $defaultMarBtm
      border-bottom: 1px solid #eee
      &:last-child
        border-bottom: none
      .atl-hd
        height: 32px
        .auth
          display: flex
          justify-content: flex-start
          align-items: center
          font-size: 13px
          color: $iconColor
          .auth-img
            width: 28px
            height: 28px
            border-radius: 50%
            overflow: hidden
      .atl-ctn
        display: flex
        align-items: flex-start
        justify-content: space-between
        height: 130px
        overflow: hidden
        .atl-img
          width: 130px
          align-self: center
        .des-ttl
          height: 30px
          line-height: 30px
          font-size: 18px
          font-weight: bold
        .des-text
          font-size: 13px
          width: 630px
      .atl-ft
        height: 20px
        display: flex
        font-size: 12px
        justify-content: flex-start
        color: $iconColor
        span
          line-height: 20px
        .ft-wths
          width: 20px
          margin-left: 10px
        .ft-msgs
          width: 20px

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
  .ttl
    position: relative
    display: flex
    justify-content: flex-start
    width: 100%
    height: $ttlHht
    text-align: left
    margin-bottom: $defaultMarBtm
    .ttl-img
      width: $ttlImgWth
    span
      line-height: $ttlHht
      text-indent: 10px
      font-size: 24px
      h2
        font-weight: normal
    .more-link
      position: absolute
      top: 7px
      right: 10px
      width: 48px
      line-height: 22px
      border-radius: 4px
      border: 1px solid #ccd0d7
      font-size: 12px
      a
        display: block
        color: rgb(85, 85, 85)
        text-align: center
        &:hover
          background: #ccd0d7
          cursor: pointer
  .icon-mrnrt
    margin: 0 $iconMarRt 0 $iconMarLt
  .atl-wrap
    .atl-ttl
      .more-link
        left: 800px
</style>
