//模型
var mongoose = require('mongoose')
var TeamSchema = require('../schemas/Team')
var Team = mongoose.model('Team', TeamSchema)

module.exports = Team
