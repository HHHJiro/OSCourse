//模型
var mongoose = require('mongoose')
var ResourceSchema = require('../schemas/Resource')
var Resource = mongoose.model('Resource', ResourceSchema)

module.exports = Resource
