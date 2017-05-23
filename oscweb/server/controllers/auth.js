const User = require('../models/user.js')
const jwt = require('jwt-simple') // 引入jwt
const config = require('../config')
const SECRET = config.auth.SECRET

//登陆
const login = async (req, res, next) => {
  const params = req.body
  const user = await User.findByAccount(params.id)
  if(user != null){ // 如果查无此用户会返回null
    let isMatch = user.comparePassword(params.password)
    if(!isMatch){
      res.send(401, {info: '密码错误'})
    } else { // 如果密码正确
      const token = signToken(user._id)
      res.send(200, {info: `欢迎用户:${params.id}`,token: token})
    }
  } else {
    res.send(401, {info: '该户名不存在'})
  }
}

//注册
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
      const token = signToken(params.id)
      res.send(200, {token: token})
      return next()
    }
  })
}

// 签发token
const signToken = (id) => {
  // id=DB => _id
  const expires = Date.now() + config.auth.EXPIRES
  const token = jwt.encode({
    iss: id,
    exp: expires
  }, SECRET)
  return token
}

// 验证token
const verifyToken = (req, res, next) => {
  const token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['osc-access-token']
  if (token) {
    try {
      const decoded = jwt.decode(token, SECRET)
      // 此处可以对decoded的token做各种验证，比如是否含有userName，userName是否合法等
      if (decoded.exp <= Date.now()) {
        // 此处验证token是否过期
        res.send(403, {
          'ForbiddenError': 'Access token has expired.'
        })
      }
      // 当所有验证条件都通过时，返回给路由处理，还可在请求上附加信息
      req.id = decoded.iss
      next()
    } catch (err) {
      res.send(500, {
        'InternalServerError': 'Can not decode given token.'
      })
    }
  } else {
    res.send(400, {
      'BadRequestError': 'Do not have a valid token.'
    })
  }
}

module.exports = {
  login,
  // getUserInfo,
  // getAllUserInfo,
  userAdd,
  // showInfo,
  // putInfo,
  signToken,
  verifyToken
}
