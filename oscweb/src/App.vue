<template>
 <div id="app">
  <header> <ghd></ghd> </header>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div class="container">
      <router-view ></router-view>
    </div>
  </div>
</template>

<script>
// import jwt from 'jsonwebtoken'
import ghd from '@/components/ghd'

export default {
  name: 'app',
  components: {ghd}
}
</script>

<style lang="sass">
  $marLR: 96px
  $marTop: 10px

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
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50
  
  .container
    margin: $marTop $marLR 0
    background-color: #fff
</style>
