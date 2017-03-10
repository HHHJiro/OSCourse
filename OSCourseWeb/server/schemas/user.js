//模式编写
var mongoose = require('mongoose')

var bcrypt = require('bcryptjs')  //用bcryptjs 代替bcrypt 
var SALT_WORK_FACTOR = 10
var UserSchema = new mongoose.Schema({
	name:{
		unique:true,
		type:String
	},
	// 0 : nomal user
	// 1 : verified user
	// 2 : professonal user
	// >10: admin
	// >50: super admin 　　
	role:{
		type:Number,
		default:0
	},
	password:String,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}
	}
});


//来自同学的回答解决了密码不加密的问题
UserSchema.pre('save', function (next) {
  var user = this;
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now();
  } else {
    this.meta.updateAt = Date.now();
  }
  var hash = bcrypt.hashSync(this.password);
  this.password = hash;
  next();
});
  
UserSchema.methods = {
 	comparePassword: function (_password) {
    var hash = this.password;
    var isMatch = bcrypt.compareSync(_password, hash);
      return isMatch
    }
};


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
		 .findOne({_id:id})
		 .catch(err=>{
			 console.log(err)
			})
		 return userInfo
	},
	findByName: async function(name){
		 const userInfo =  await this
		 .findOne({name:name})
		 .catch(err=>{
			 console.log(err)
			})
		 return userInfo
	}
}


module.exports = UserSchema