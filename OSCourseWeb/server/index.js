const 
	api = require('./api/user.js'),
	fs = require('fs'),
	Koa = require('koa'),
	router = require('koa-router')(),
	json = require('koa-json'),
  logger = require('koa-logger'),
	path = require('path'),
	bodyParser = require('koa-bodyparser'),
	auth = require('./routes/auth.js'); // 引入auth
	// bodyParser = require('body-parser'),
	// express = require('express')
const	app = new Koa();
const mongoose = require('mongoose')
const dbUrl = 'mongodb://localhost/OScourse'
mongoose.Promise = require('bluebird');
mongoose.connect(dbUrl)
app.use(bodyParser());
app.use(json());
app.use(logger());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(api);
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
router.use('/auth', auth.routes()); // 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径。
// app.use(router.routes()); // 将路由规则挂载到Koa上。




app.use(router.routes()).use(router.allowedMethods());

app.listen(8088);
console.log('success listen…………');