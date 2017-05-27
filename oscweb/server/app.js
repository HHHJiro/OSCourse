const restify = require('restify')
const plugins = require('restify-plugins')
const config = require('./config.js')
const mongoose = require('mongoose')
const auth = require('./controllers/auth')
const user = require('./controllers/user')
// const Utils = require('./utils')
const path = require('path')
const file = require('./controllers/file')

const server = restify.createServer({
  name: 'osCourseServer',
  version: '1.0.0'
})

server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())
// server.use(plugins.bodyParser())
server.use(restify.bodyParser({
  maxBodySize: 0,
  mapParams: true,
  mapFiles: true,
  overrideParams: true,
  keepExtensions: true,
  uploadDir: path.join(__dirname, '/upload'),
  multiples: true,
  hash: 'sha1',
  rejectUnknown: true
}))

mongoose.connect(config.db.dbUrl)
mongoose.Promise = require('bluebird')
//测试api
server.get('api/echo/:name', function (req, res, next) {
  res.send(req.params)
  return next()
})

// 用户上传头像
server.post('api/user/avatar', auth.verifyToken, file.uploadAvatar, file.editAvaPath,file.uploadSend)
// 用户上传文件
server.post('api/resource/server', auth.verifyToken, file.uploadRes)
// 用户将上传的文件存入数据库
server.post('api/resource/db', auth.verifyToken, file.saveToDb)
// 查看某类型的文档
server.get('api/resource/:type', file.getType)

server.get('api/resource/uploadBy/:id', file.getOneUploads)

// server.get('api/users', api.getAllUserInfo)
//查看某个video
server.get('api/file/:id', file.getResInfo)
//注册
server.post('api/user/add', auth.userAdd)
//登录 签发token
server.post('api/user/auth', auth.login)
// 用户信息
server.get('api/user/info', auth.verifyToken, user.showInfo)
// 修改用户信息
server.put('api/user/info', auth.verifyToken, user.putInfo)




server.listen(config.server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})