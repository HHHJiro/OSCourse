const config = require('./config')
const jwt = require('jwt-simple') // 引入jwt
const SECRET = config.auth.SECRET
const path = require('path')
const fs = require('fs')
const User = require('./models/user.js')
const Resource = require('./models/resource.js')
const _ = require('lodash')
const qiniu = require('qiniu')
// const status = require('./status')

const fileType = {
  'video/mp4': 'mp4',
  'application/x-zip-compressed': 'zip',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/msword': 'doc',
  'application/vnd.ms-powerpoint': 'ppt',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'application/vnd.ms-excel': 'xls',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx'
}
const isDoc = ['doc', 'docx', 'ppt', 'pptx' , 'xls', 'xlsx']

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
  var isDoc = false
  for (var i in req.files) {
    let file = req.files[i]
    if (file.size == 0){
      // 使用同步方式删除一个文件
      fs.unlinkSync(file.path)
      req.uploadFlag = false
    } else {
      if (fileType[file.type]) {
        var fileName = file.hash + '.' + fileType[file.type]
        var target_path = path.join('../static/upload', fileName)
        // 使用同步方式重命名一个文件
        fs.renameSync(file.path, target_path)
        req.uploadFlag = true
        req.fileName = fileName
        if (fileType[file.type] != 'mp4' && fileType[file.type] != 'zip') {
          isDoc = true
        }
      } else {
        console.log('不是指定的格式')
      }
    }
  }
  var truePath = '/static/upload/' + fileName
  if (isDoc) {
    //上传至七牛
    var result = uploadQn(req.fileName, truePath)
    if(result) {
      res.send(200, {msg: '上传成功', path: truePath})
    } else {
      res.send(400, {msg: '上传失败'})
    }
  } else {
    res.send(200, {msg: '上传成功', path: truePath})
  }
}
//找到资源信息
const getResInfo = (req, res, next) => {
  const id = req.params.id
  Resource.update({_id:id}, {$inc: {pv: 1}})
    .then(data => {
      Resource.findOne({_id:id})
        .populate('uploadBy', 'nickName')
        .exec((err, video) => {
          if (err) {
            res.send(400, err)
          } else {
            var endFile = video.path.split('.').pop()
            var fileType = endFile === 'mp4' ? 'mp4' : (isDoc.includes(endFile) ? 'doc' : 'zip')
            res.send(200, {video: video, fileType: fileType})
          }
        })
    })
}

// 更改数据库
const editAvaPath = (req, res, next) => {
  const avaPath = '/static/img/avatar/'
  const filePath = avaPath + req.fileName
  User.update({_id: req.id}, {$set: {avatar: filePath}}, err => {
    if (err) {
      console.log(err)
    }
  })
  next()
}
//保存到数据库
const saveToDb = (req, res) => {
  var data = req.body
  let _resource = _.assign(data,{uploadBy: req.id})
  let resource = new Resource(_resource)
  // console.log(resource)
  resource.save((err, resource) => {
    if(err) {
      console.log(err)
      res.send(400, '失败')
    } else {
      res.send(200, '成功')
    }
  })
}
const getType = (req, res) => {
  let type = req.params
  Resource.find(type)
    .populate('uploadBy', ['nickName', 'avatar'])
    .exec((err, resrouces) => {
      res.send(200, {resrouces: resrouces})
    })
}

//上传七牛的方法
const uploadQn = async (fileName, truePath) => {
//需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = 'GrmYZ5oBOT7Vpqb1iR85FVgLxUF-PMiSNY2Xc0UG'
  qiniu.conf.SECRET_KEY = 'iluRu-FT_BGMCcPsGcVG9znipyDdZeYTH2zkygAo'
//要上传的空间
  var bucket = 'online-office'
//上传到七牛后保存的文件名
  var key = fileName
//构建上传策略函数
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket+':'+key)
    return putPolicy.token()
  }
//生成上传 Token
  var token = uptoken(bucket, key)
//要上传文件的本地路径
  var filePath = '..' + truePath
//构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra()
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if(!err) {
        // 上传成功， 处理返回值
        console.log('上传七牛成功')
        console.log(ret.hash, ret.key, ret.persistentId)
        return true       
      } else {
        // 上传失败， 处理返回代码
        console.log('上传七牛失败')
        console.log(err)
        return false
      }
    })
  }
//调用uploadFile上传
  var result = await uploadFile(token, key, filePath)
  return result
}

module.exports = {
  signToken,
  authToken,
  upload,
  editAvaPath,
  uploadRes,
  saveToDb,
  getType,
  getResInfo
}
