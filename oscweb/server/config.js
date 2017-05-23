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
  db:{dbUrl: 'mongodb://localhost/socouresV2'},
  qiniu: {
    ACCESS_KEY: 'GrmYZ5oBOT7Vpqb1iR85FVgLxUF-PMiSNY2Xc0UG',
    SECRET_KEY: 'iluRu-FT_BGMCcPsGcVG9znipyDdZeYTH2zkygAo',
    bucket: 'online-office'
  }
}

module.exports = CONFIG