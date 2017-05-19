//模式编写
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var ResourceSchema = new mongoose.Schema({
  name: String,
  desc: String,
  type: String,
  uploadBy: {type: ObjectId, ref: 'User'},
  meta: {
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()}
  },
  path: String,
  pv: {type: Number, default: 0},
  download: {type: Number, default: 0}
})

ResourceSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
  

//静态方法
ResourceSchema.statics = {
  fetch: async function(){
    const resInfo = await this
      .find({})
      .sort('meta.updateAt')
      .catch(err=>{
        console.log(err)
      })
    return resInfo
  },
  findById: async function(id){
    const resInfo =  await this
      .findOne({_id: id})
      .catch(err => {
        console.log(err)
      })
    return resInfo
  }
} 

module.exports = ResourceSchema
