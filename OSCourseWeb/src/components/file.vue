<template>
	<el-row>
	  <el-col :span="4" v-for="(o, index) in 2" :key="index" :offset="index > 0 ? 2 : 0">
	    <el-card :body-style="{ padding: '0px' }">
	      <img src="" class="image">
	      <div style="padding: 14px;">
	        <span>好吃的汉堡</span>
	        <div class="bottom clearfix">
	          <time class="time">{{ currentDate}}</time>
	          <div class="block">
			  <el-rate v-model="value1" :colors="['#99A9BF', '#F7BA2A', '#FF9900']"  ></el-rate>
			</div>
	        </div>
	      </div>
	    </el-card>
	  </el-col>
	</el-row>
</template>
<script>
	export default {
		data(){
			return {
				 currentDate: new Date().toLocaleString().split(' ')[0],
				 value1:null
			}
		},
		methods(){

		},
	}
</script>
<style>
	  .time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>