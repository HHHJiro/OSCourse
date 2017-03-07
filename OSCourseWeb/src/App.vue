<template>
 <div id="app">
  <Hello message="path"></Hello>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view ></router-view>
</div>
</template>

<script>

import Hello from './components/Hello'

export default {
  name: 'app',
  components:{Hello},
  watch: {
  '$route'() {
    this.routeData = this.$route.path
  }
}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
