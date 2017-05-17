<template>
  <div id="app">
    <header> <ghd></ghd> </header>
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="hr"></div>
    <div class="container">
      <transition name="fadeUp" mode="out-in">
        <router-view ></router-view>
      </transition>
    </div>
    <footer><gft></gft></footer>
  </div>
</template>

<script>
// import jwt from 'jsonwebtoken'
import ghd from '@/components/ghd'
import gft from '@/components/gft'

export default {
  name: 'app',
  components: {
    ghd,
    gft
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="sass">
  $marLR: 96px
  $marTop: 10px
  $marBtm: 40px
  body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td 
    margin: 0
    padding: 0

  body, button, input, select, textarea 
    font: 12px/1.5tahoma, arial, \5b8b\4f53

  h1, h2, h3, h4, h5, h6
    font-size: 100%
  address, cite, dfn, em, var 
    font-style: normal

  code, kbd, pre, samp 
   font-family: couriernew, courier, monospace
  small
   font-size: 12px
  ul, ol
    list-style: none
  a 
    text-decoration: none
    color: #fff
    &:hover 
      text-decoration: none
  sup 
    vertical-align: text-top
  sub
    vertical-align: text-bottom
  legend 
    color: #000
  fieldset, img
    border: 0
  button, input, select, textarea 
    font-size: 100%
  table 
    border-collapse: collapse
    border-spacing: 0

  #app 
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
  .hr
    width: 100%
    background: rgb(241, 242, 243)
    height: 20px
  .container
    margin: $marTop $marLR $marBtm
    background-color: #fff
    min-height: 400px

  .fadeUp-leave-active, .fade-enter
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
    transform: translateY(-50px)
    opacity: 0
  .fadeUp-enter-active
    transition: all .3s ease
  .fadeUp-enter
    transform: translateY(50px)
    opacity: 0
</style>
