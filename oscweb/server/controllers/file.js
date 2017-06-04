const Resource = require('../models/resource.js')
const User = require('../models/user.js')
const status = require('../status')
const path = require('path')
const fs = require('fs')
const qiniu = require('qiniu')
const fileType = require('../utils').fileType
const isDoc = require('../utils').isDoc
const _ = require('lodash')
const conf = require('../config')

//上传状态码
const uploadSend = (req, res) => {
  if (req.uploadFlag) {
    res.send(status.edit, '上传头像成功')
  } else {
    res.send(status.wrong, '失败')
  }
}

// 上传头像
// req.type: avatar
const uploadAvatar = (req, res, next) => {
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
      //加了../
      var target_path = path.join('../static/img', filePath, fileName)
      // 使用同步方式重命名一个文件
      fs.renameSync(file.path, target_path)
      req.uploadFlag = true
      req.fileName = fileName
    }
  }
  next()
}

// 上传头像更新数据库
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

//个人主页查看个人的上传
const getOneUploads = (req, res) => {
  let userId = req.params.id
  Resource.find({uploadBy: userId})
    .exec((err, resources) => {
      res.send(200, resources)
    })
}

//上传资源
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
//上传到七牛
const uploadQn = async (fileName, truePath) => {
//需要填写你的 Access Key 和 Secret Key
  qiniu.conf.ACCESS_KEY = conf.qiniu.ACCESS_KEY
  qiniu.conf.SECRET_KEY = conf.qiniu.SECRET_KEY
//要上传的空间
  var bucket = conf.qiniu.bucket
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

//上传资源保存到数据库
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

//找到某一模块所有的文件
const getType = (req, res) => {
  let type = req.params
  Resource.find(type)
    .populate('uploadBy', ['nickName', 'avatar', 'role'])
    .exec((err, resrouces) => {
      res.send(200, {resrouces: resrouces})
    })
}
//修改文件信息
const editFile = (req, res) => {
  let id = req.params.id
  Resource.findById(id)
    .then(file => {
      let result = _.assign(file, req.body)
      result.save((err, result) => {
        if (err) {
          console.log(err)
          res.send(400,{info: '修改失败'})
        } else {
          res.send(200, '修改成功')
        }
      })
    })
}

const removeFile = (req, res) => {
  let id = req.params.id
  Resource.remove({_id: id}, err => {
    if (err) {
      res.send(400,{info: '删除失败'})
    } else {
      res.send(200)
    }
  })
}

//找到某一确定资源信息
const getResInfo = (req, res, next) => {
  const id = req.params.id
  Resource.update({_id:id}, {$inc: {pv: 1}})
    .then(data => {
      Resource.findOne({_id:id})
        .populate('uploadBy', 'nickName')
        .exec((err, file) => {
          if (err) {
            res.send(400, err)
          } else {
            var endFile = file.path.split('.').pop()
            var fileType = endFile === 'mp4' ? 'mp4' : (isDoc.includes(endFile) ? 'doc' : 'zip')
            res.send(200, {file: file, fileType: fileType})
          }
        })
    })
}

//搜索提示
const getSearchTips = (req, res) => {
  Resource.find({}, 'name desc')
    .exec((err, files) => {
      res.send(200, files)
    })
}
//搜索结果
const getSearchResult = (req, res) => {
  let sortBy = '-meta.createAt'
  const keyword = req.query.q
  const reg = new RegExp(keyword, 'i') //不区分大小写
  Resource.find(
    {
      $or: [ //多条件，数组
        {name : {$regex : reg}},
        {desc : {$regex : reg}}
      ]
    })
    .sort(sortBy)
    .populate('uploadBy', ['nickName', 'avatar', 'role'])
    .exec((err, result) => {
      res.send(200,result)
    })
}
//分析文件信息
const analysisFile = (req, res) => {
  let key = req.query.key || 1
  Resource.aggregate(
    {
      $group: {
        _id : '$type', 
        total: {'$sum': key}
      }
    }
  )
    .exec((err, data) => {
      Resource.count({}, (err, counts) => {
        res.send(200, {countQuery: data, countFile: counts})
      })
    })
}

const adminGetUserInfo = (req, res) => {
  Resource.aggregate([
    {
      '$group': {
        '_id' : '$uploadBy',
        'totleUpload': {'$sum' : 1},
        'totlePv': {'$sum': '$pv'}
      }
    },
    {
      '$lookup' : {
        'from': 'users',
        'localField': '_id',
        'foreignField': '_id',
        'as': 'user'
      }
    },
    { '$sort': { 'user.meta.createAt': -1 } }
  ],(err, data) => {
    res.send(200, data)
  })
}

const adminGetFilesInfo = (req, res) => {
  Resource.find({}, (err, data) => {
    res.send(200, data)
  })
}

module.exports = {
  uploadSend,
  uploadAvatar,
  uploadRes,
  getResInfo,
  editAvaPath,
  saveToDb,
  getType,
  getOneUploads,
  editFile,
  removeFile,
  getSearchTips,
  getSearchResult,
  analysisFile,
  adminGetUserInfo,
  adminGetFilesInfo
}