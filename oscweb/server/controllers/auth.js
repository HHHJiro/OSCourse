const User = require('../models/user.js')
const Utils = require('../utils')

//登陆
const login = async (req, res, next) => {
  const params = req.body
  const user = await User.findById(params.id)
  if(user != null){ // 如果查无此用户会返回null
    let isMatch = user.comparePassword(params.password)
    if(!isMatch){
      res.send(401, {info: '密码错误'})
    } else { // 如果密码正确
      const token = Utils.signToken(params.id)
      res.send(200, {info: `欢迎用户:${params.id}`,token: token})
    }
  } else {
    res.send(401, {info: '该户名不存在'})
  }
}

const getUserInfo = async  (req, res, next) => {
  const params = req.params
  let id = params.id // 获取url里传过来的参数里的id
  // await “同步”地返回查询结果
  const result = await User.findById(id).catch(err => {console.log(err)})
  res.send(200,result)
  return next()
}
//查看个人信息
const showInfo = async (req, res, next) => {
  const id = req.id
  const result = await User.findById(id).catch(err => console.log(err))
  res.send(200,{result})
  return next()
}

// 显示所有的人
const getAllUserInfo = async (req, res, next) => {
  const result = await User.fetch().catch(function (err){console.log(err)})
  res.send(result)
  return next()
}

const userAdd = (req, res, next) => {
  const params = req.body
  let user = new User({
    id : params.id,
    password : params.password
  })
// 保存数据user数据进mongoDB
  user.save((err,data) => {
    console.log(err)
    if (err) {
      res.status(500)
      res.send('error addUser')
    } else {
      const token = Utils.signToken(params.id)
      res.send(200, {token: token})
      return next()
    }
  })
}

module.exports = {
  login,
  getUserInfo,
  getAllUserInfo,
  userAdd,
  showInfo
}
