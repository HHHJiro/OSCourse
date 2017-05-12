const restify = require('restify')
const plugins = require('restify-plugins')
const config = require('./config.js')
const mongoose = require('mongoose')
const api = require('./controllers/auth')
const Utils = require('./utils')

const server = restify.createServer({
  name: 'osCourseServer',
  version: '1.0.0'
})
server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())
server.use(plugins.bodyParser())

mongoose.connect(config.db.dbUrl)
mongoose.Promise = require('bluebird')
server.get('api/echo/:name', function (req, res, next) {
  res.send(req.params)
  return next()
})
// server.post('/api/auth', function (req, res, next) {
//   const params = req.body
//   const data = {
//     params
//   }
//   res.send(data)
//   return next()
// })

// server.get('api/users', api.getAllUserInfo)
server.post('api/user/add', api.userAdd)
server.post('api/user/auth', api.login)
// server.get('api/token', Utils.authToken, (req, res, next) => {
//   res.send(req.id)
// })

// server.get('api/user/:id', api.getUserInfo)


server.listen(config.server.PORT, function () {
  console.log('%s listening at %s', server.name, server.url)
})