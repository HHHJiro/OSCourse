const status = {}
// 普通成功
status.success = 200
// 修改成功
status.edit = 201
// 删除成功
status.delete = 204
// 操作失败
status.wrong = 400
//用户没有权限（用户名或者密码错误）
status.unAuth = 401
// 表示用户得到授权,但是访问是被禁止的
status.forbidden  = 403
// 用户发出的请求针对的是不存在的记录
status.notFound = 404
// 用户请求的格式错误
status.notFound = 406
// 服务器发生错误
status.severErr = 500

module.exports = {
  status
} 