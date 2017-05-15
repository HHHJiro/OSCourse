const status = require('../status')

const uploadSend = (req, res) => {
  if (req.uploadFlag) {
    res.send(status.edit, '上传头像成功')
  } else {
    res.send(status.wrong, '失败')
  }
}

module.exports = {
  uploadSend
}