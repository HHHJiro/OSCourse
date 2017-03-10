<template>
 <div id="app">
  <Hello></Hello>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <div class="container">
    <router-view ></router-view>
  </div>
</div>
</template>

<script>
// import jwt from 'jsonwebtoken'
import Hello from './components/Hello'

export default {
  name: 'app',
  components:{Hello}
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
.container{
  margin: 30px 55px 0;
}
</style>
