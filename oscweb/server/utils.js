const config = require('./config')
const jwt = require('jwt-simple') // 引入jwt
const SECRET = config.auth.SECRET
const path = require('path')
const fs = require('fs')
const User = require('./models/user.js')
const Resource = require('./models/resource.js')
const Category = require('./models/Category.js')
// const _ = require('lodash')
// const status = require('./status')

const fileType = {
  'video/mp4': 'mp4',
  'application/x-zip-compressed': 'zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx'
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

// 上传文件
// req.type: avatar
const upload = (req, res, next) => {
  const filePath = req.url.split('/').pop()
  req.type = filePath
  // cosnt filePath = 
  for (var i in req.files) {
    let file = req.files[i]
    if (file.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(file.path)
      req.uploadFlag = false
    } else {
      var fileName = filePath + '_' + file.hash + '.jpg'
      var target_path = path.join('../static/img', filePath, fileName)
      // 使用同步方式重命名一个文件
      fs.renameSync(file.path, target_path)
      req.uploadFlag = true
      req.fileName = fileName
    }
  }
  next()
}
const uploadRes = (req, res ,next) => {
  for (var i in req.files) {
    let file = req.files[i]
    if (file.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(file.path)
      req.uploadFlag = false
    } else {
      var fileName = file.hash + '.' + fileType[file.type]
      var target_path = path.join('../static/upload', fileName)
      // 使用同步方式重命名一个文件
      fs.renameSync(file.path, target_path)
      req.uploadFlag = true
      req.fileName = fileName
    }
  }
  var truePath = './static/upload/' + fileName
  res.send(200, {msg: '上传成功', path: truePath})
}
// 更改数据库
const editAvaPath = (req, res, next) => {
  const avaPath = './static/img/avatar/'
  const filePath = avaPath + req.fileName
  User.update({_id: req.id}, {$set: {avatar: filePath}}, err => {
    if (err) {
      console.log(err)
    }
  })
  next()
}
const saveToDb = (req, res) => {
  console.log(req.body)
  var data = req.body
  let resource = new Resource({
    'name': data.name,
    'type': data.type,
    'desc': data.desc,
    'uploadBy': req.id,
    'path': data.path
  })
  // console.log(resource)
  resource.save((err, resource) => {
    if(err) {
      console.log(err)
      res.send(400, '失败')
    } else {
      Category.findByName(data.category)
      .then(category => {
        if (category) {
          category.resources.push(resource._id)
          category.save((err, category) => {
            res.send(200, 'push资源')
          })
        } else {
          let category = new Category({
            name: data.category,
            resources: [resource._id]
          })
          category.save((err,category) => {
            res.send(200, '新增资源')
          })
        }
      })
    }
  })
}
module.exports = {
  signToken,
  authToken,
  upload,
  editAvaPath,
  uploadRes,
  saveToDb
}
