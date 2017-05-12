const CONFIG = {
  server: {PORT: 8088},
  auth: {
    SECRET: 'YOUR_SECRET_STRING',
    EXPIRES: 1000*60*60*24*7,
  },
  userDefault: {
    nickName: '匿名用户',
    avatar: '/static/img/avatar/default.png'
  },
  db:{dbUrl: 'mongodb://localhost/socouresV2'}
}

module.exports = CONFIG