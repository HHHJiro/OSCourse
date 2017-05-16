//模式编写
var mongoose = require('mongoose')
var userDefault = require('../config').userDefault

var bcrypt = require('bcryptjs')  //用bcryptjs 代替bcrypt 
var UserSchema = new mongoose.Schema({
  id: {
    unique:true,
    type:String
  }, 
  nickName: {
    type: String,
    default: userDefault.nickName
  },
  avatar: {
    type: String,
    default: userDefault.avatar
  },
  // 0-10  : student
  // >10   : teacher
  // >50   : admin 
  role: {
    type:Number,
    default:0
  },
  password: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

//来自同学的回答解决了密码不加密的问题
UserSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  var hash = bcrypt.hashSync(this.password)
  this.password = hash
  next()
})
  
UserSchema.methods = {
  comparePassword: function (_password) {
    var hash = this.password
    var isMatch = bcrypt.compareSync(_password, hash)
    return isMatch
  }
}


//静态方法
UserSchema.statics = {
  fetch: async function(){
    const usersInfo = await this
      .find({})
      .sort('meta.updateAt')
      .catch(err=>{
        console.log(err)
      })
    return usersInfo
  },
  findById: async function(id){
    const userInfo =  await this
      .findOne({_id: id})
      .catch(err => {
        console.log(err)
      })
    return userInfo
  },
  findByAccount: async function(account){
    const userInfo =  await this
      .findOne({id: account})
      .catch(err=>{
        console.log(err)
      })
    return userInfo
  }
} 

module.exports = UserSchema
