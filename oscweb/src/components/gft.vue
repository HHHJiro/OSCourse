<template>
  <div id="gft">
    <div class="ft-wrap">
       <ul class="ft-ctn">
        <li v-for="item in abouts" class="ft-item"> <a href="">{{item}}</a></li>
       </ul>
       <p class="copyrt">  &copy; 2017 重庆理工大学</p>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      abouts: ['关于网站', '帮助中心', '联系我们']
    }
  }
}
</script>
<style lang="sass" scoped>
  $defaultMarLR: 96px
  #gft
    width: 100%
    background: #f6f9fa
    height: 200px
    .ft-wrap
      margin: 0 $defaultMarLR 0
      height: 150px
      .ft-ctn
        display: flex
        justify-content: space-around
        align-items: stretch
        height: 100%
        .ft-item
          width: 300px
          text-align: center
          display: flex
          align-items: center
          justify-content: center
          a
            color: #222
            font-size: 14px
            &:hover
              color: #00a1d6
      .copyrt
        text-align: center
        color: #99a2aa
        font-size: 12px
</style>
