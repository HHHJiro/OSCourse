const User = require('../models/user')
const express = require('express');
const router = express.Router();

// router.post('/api/login/createAccount',(req,res) => {
//     // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
//     let newAccount = new models.Login({
//         account : req.body.account,
//         password : req.body.password
//     });
//     // 保存数据newAccount数据进mongoDB
//     newAccount.save((err,data) => {
//         if (err) {
//             res.send(err);
//         } else {
//             res.send('createAccount successed');
//         }
//     });
// });
// 获取已有账号接口
router.post('/api/userlog',(req,res) => {
  // 通过模型去查找数据库
  // console.log(res)
	var name = req.body.name
	var password = req.body.password
	 User.findOne({name:name}, function(err, user){
	if (err) {
		return res.status(500).send('出错')
	}

	if (!user) {
		return res.status(500).send('没有这个ID')
	}

	user.comparePassword(password, function(err,isMatch){
		if (err) {
			console.log(err)
		}

		if (isMatch) {
			return res.status(200).send('登陆成功')
		}
		else{
			console.log(user)
			return res.status(500).send('密码不对')
		}
	})
	})
});

router.post('/api/user',(req,res) => {
    // 这里的req.body能够使用就在index.js中引入了const bodyParser = require('body-parser')
    let user = new User({
        name : req.body.name,
        password : req.body.password
    });
    // 保存数据user数据进mongoDB
    user.save((err,data) => {
    	console.log(err)
        if (err) 
          return res.status(500).send('ID被占用')
        return res.json({data})
        
    });
});

module.exports = router;