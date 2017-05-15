const restify = require('restify')
const plugins = require('restify-plugins')
const config = require('./config.js')
const mongoose = require('mongoose')
const api = require('./controllers/auth')
const Utils = require('./utils')
const path = require('path')
const upload = require('./controllers/upload')

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
server.get('api/echo/:name', function (req, res, next) {
  res.send(req.params)
  return next()
})
// 上传
server.post('/api/user/avatar', Utils.authToken, Utils.upload, Utils.editAvaPath,upload.uploadSend)


// server.get('api/users', api.getAllUserInfo)
server.post('api/user/add', api.userAdd)
server.post('api/user/auth', api.login)
server.get('api/user/info', Utils.authToken, api.showInfo)




server.listen(config.server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})