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

// 用户上传文件api/resource/server
server.post('api/file/server', auth.verifyToken, file.uploadRes)
// 用户将上传的文件存入数据库resource/db
server.post('api/file/save', auth.verifyToken, file.saveToDb)
// 查看某类型的文档resource/:type
server.get('api/files/:type', file.getType)
//查看个人上传resource/uploadBy/:id
server.get('api/file/uploadBy/:id', file.getOneUploads)

// server.get('api/users', api.getAllUserInfo)
//查看某个文件
server.get('api/file/:id', file.getResInfo)

// 用户上传头像
server.post('api/user/avatar', auth.verifyToken, file.uploadAvatar, file.editAvaPath,file.uploadSend)
//上传教师团队资料
server.post('api/user/team', auth.verifyToken, user.teamCard)
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