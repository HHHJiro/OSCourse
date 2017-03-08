// controllers/user.js 

const 
  user = require('../models/user.js'),
  jwt = require('koa-jwt'); // 引入koa-jwt
  bcrypt = require('bcryptjs')

//通过name查找
const postUserAuth = async function(){
  const userpost = this.request.body; // post过来的数据存在request.body里
  const userInfo = await user.findByName(userpost.name);
  if(userInfo != null){ // 如果查无此用户会返回null
    console.log(userpost.password)
    console.log(userInfo.password)
    if(userInfo.password != userpost.password){
      this.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误！'
      }
    }else{ // 如果密码正确
      const userToken = {
        name: userInfo.name,
        id: userInfo._id
      }
      const secret = 'OS-Course-Website'; // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken,secret); // 签发token
      this.body = {
        success: true,
        token: token, // 返回token
      }
    }
  }else{
    this.body = {
      success: false,
      info: '用户不存在！' // 如果用户不存在返回用户不存在
    }
  }
}
const getUserInfo = async function (){
  let id = this.params.id; // 获取url里传过来的参数里的id
// await “同步”地返回查询结果
  const result = await user.findById(id).catch(function (err){console.log(err)})
 this.body = result
};

//显示所有的人
const getAllUserInfo = async function (){
  const result = await user.fetch().catch(function (err){console.log(err)})
   this.body = result
};

module.exports = {
  auth: (router) => {
    router.post('/user', postUserAuth);
    router.get('/user/:id', getUserInfo); // 定义url的参数是id
    router.get('/user', getAllUserInfo);
  }
}