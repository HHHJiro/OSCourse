const getInfo = async (pointer, next) => {
	const self = pointer
	return self.$http.get('api/user/info')
	.then(res => {
		var data = res.data.result
		return data
	}, res => {
		console.log('oh no')
	})
}
const formDate =  (t, type = 2) => {
  // filter type
  // 1 日期带时分秒
  // 2 距离现在过去多久
  // 3 24小时显示内距离现在过去多久,24小时以上显示日期不带时分秒
  const timeSpan = new Date(t).getTime()
  const dateTime = new Date(parseInt(timeSpan))
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const day = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  // const second = dateTime.getSeconds()

  if (type === 1) {
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  } else {
    const now = new Date()
    const nowNew = Date.parse(now)

    const ms = nowNew - timeSpan
    let timeSpanStr

    if (ms <= 1000 * 60 * 1) {
      timeSpanStr = '刚刚'
    } else if (1000 * 60 * 1 < ms && ms <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((ms / (1000 * 60))) + '分钟前'
    } else if (1000 * 60 * 60 * 1 < ms && ms <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(ms / (1000 * 60 * 60)) + '小时前'
    } else {
      if (type === 2) {
        if (1000 * 60 * 60 * 24 < ms && ms <= 1000 * 60 * 60 * 24 * 30) {
          timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24)) + '天前'
        } else if (1000 * 60 * 60 * 24 * 30 < ms && ms <= 1000 * 60 * 60 * 24 * 365) {
          timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24 * 30)) + '月前'
        } else {
          timeSpanStr = Math.round(ms / (1000 * 60 * 60 * 24 * 365)) + '年前'
        }
      } else if (type === 3) {
        timeSpanStr = year + '-' + month + '-' + day
      }
    }
    return timeSpanStr
  }
}
//版块
const formType = (type) => {
  let typeTrans = {
    'micro': '师生微课',
    'teach': '教学资源',
    'video': '教学视频',
    'outline': '教学大纲',
    'cala': '教学日历'
  }
  return typeTrans[type]
}
//等级
const formRole = (role) => {
  let result = role >= 10 ? '教师' : '同学'
  return result
}
const fileType = (path) => {
  return path.split('.').pop()
}
const teamTitle = (title) => {
  let titles = {
    'tit1': '助教',
    'tit2': '讲师',
    'tit3': '副教授',
    'tit4': '教授'
  }
  return titles[title]
}
export default {
	getInfo,
	formDate,
  formType,
  fileType,
  formRole,
  teamTitle
}