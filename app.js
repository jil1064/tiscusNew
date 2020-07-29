//加载模块依赖
const express=require('express');
//日志模块
const logger = require('morgan');
//path模块，用于处理文件路径
const path = require('path');
//handlebars模板引擎
const handlebars = require('express3-handlebars');
//请求体解析
const bodyParser=require('body-parser');

const app=express();

//使用请求体解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//配置视图解析器
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//配置静态路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.engine('handlebars', handlebars());

//路由模块
const index = require('./routes/index');
const account=require('./routes/account');
const events=require('./routes/events');

//注册路由
app.use('/account',account);
app.use('/events',events);
app.use('/', index.view);

//设置端口
var port = process.env.PORT || 3000;
//设置监听
var server = app.listen(port, (request, response) => {
    console.log('Express server listening on port %s', port);
});
