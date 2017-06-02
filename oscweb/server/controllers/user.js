const User = require('../models/user.js')
const _ = require('lodash')
// const getUserInfo = async  (req, res, next) => {
//   const params = req.params
//   let id = params.id // 获取url里传过来的参数里的id
//   // await “同步”地返回查询结果
//   const result = await User.findByAccount(id).catch(err => {console.log(err)})
//   res.send(200,result)
//   return next()
// }
//查看个人信息
const showInfo = async (req, res) => {
  const id = req.id
  const result = await User.findById(id).catch(err => console.log(err))
  res.send(200,{result})
}
// 显示所有的人
const getAllUserInfo = async (req, res, next) => {
  const result = await User.fetch().catch(function (err){console.log(err)})
  res.send(result)
  return next()
}

//修改用户信息
const putInfo = (req, res) => {
  const nickName = req.body
  User.findOneAndUpdate({_id: req.id}, nickName, {upsert:true}, function(err, doc){
    if (err) {
      res.send(400, '修改失败')
    }
  })
  res.send(201, '修改成功')
}

module.exports = {
  // getUserInfo,
  showInfo,
  getAllUserInfo,
  putInfo
}