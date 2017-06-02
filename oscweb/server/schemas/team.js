//模式编写
var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = Schema.ObjectId
var TeamSchema = new mongoose.Schema({
  name: String,
  desc: String,
  title: String,
  userId: {type: ObjectId, ref: 'User'},
  meta: {
    createAt: {type: Date, default: Date.now()},
    updateAt: {type: Date, default: Date.now()}
  }
})

TeamSchema.pre('save', function (next) {
  if (this.isNew) {
    this.meta.createAt = this.meta.updateAt = Date.now()
  } else {
    this.meta.updateAt = Date.now()
  }
  next()
})
  

//静态方法
TeamSchema.statics = {
  fetch: async function(){
    const teams = await this
      .find({})
      .populate('userId', ['avatar', 'nickName'])
      .sort('meta.updateAt')
      .catch(err=>{
        console.log(err)
      })
    return teams
  },
  findById: async function(id){
    const teacher =  await this
      .findOne({_id: id})
      .catch(err => {
        console.log(err)
      })
    return teacher
  }
} 

module.exports = TeamSchema
