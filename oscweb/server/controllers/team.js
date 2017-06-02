const Team = require('../models/team.js')
const _ = require('lodash')

const getTeamInfo  = (req, res) => {
  let id = req.params.id
  Team.findOne({userId: id})
    .then(info => {
      if (info) {
        res.send(200, info)
      } else {
        res.send(400, {info: '团队信息不存在'})
      }
    })
    .catch(err => {
      res.send(400, err)
    })
}

const getAllTeam = (req, res) => {
  Team.fetch()
    .then(teams => {
      res.send(200,teams)
    })
}

//编辑团队资料
const saveInfo = (req, res) => {
  let info = req.body
  // let teacher = new Team(info)
  Team.findOne({userId: info.userId},(err,teacher) => {
    if(teacher === undefined) {
      teacher = new Team(info)
    } else {
      teacher = _.assign(teacher, info)
    }
    teacher.save((err, data) => {
      if (err) {
        res.send(400, {info: '保存失败'})
      } else {
        res.send(200, {info: '保存成功',team: info})
      }
    })
  })
}

module.exports = {
  getTeamInfo,
  saveInfo,
  getAllTeam
}