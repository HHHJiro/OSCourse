const config = require('./config')
const jwt = require('jwt-simple') // 引入jwt
const SECRET = config.auth.SECRET


// 签发token
const signToken = (id) => {
  const expires = Date.now() + config.auth.EXPIRES
  const token = jwt.encode({
    iss: id,
    exp: expires
  }, SECRET)
  return token
}

const authToken = (req, res, next) => {
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
  signToken,
  authToken
}
