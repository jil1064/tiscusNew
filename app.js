//加载模块依赖
const express = require('express');
//日志模块
const logger = require('morgan');
//path模块，用于处理文件路径
const path = require('path');
//handlebars模板引擎
const handlebars = require('express3-handlebars');
//请求体解析
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();

//配置cookie和session
app.use(cookieParser('sessiontest'));
app.use(session({
    //服务端生成session的签名，md5(md5(md5($pass)))加密方式
    secret: '43e2a7a8cc1bd6c12b52bdb7508804dd',
    //保存在本地cookie的一个名字 默认connect.sid  可以不设置
    name: 'tiscus_session_id',
    //强制保存 session 即使它并没有变化,。默认为 true。建议设置成 false。
    resave: false,
    //强制将未初始化的 session 存储。默认值是true  建议设置成true
    saveUninitialized: true,
    cookie: {
        //cookie的过期时间，
        maxAge: 24 * 60 * 60 * 1000,
        //如果是https需要设置secure才可以访问cookie
        secure: true
    }
}));

//使用请求体解析中间件
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

//配置视图解析器
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

//配置静态路径
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));

app.engine('handlebars', handlebars());

//路由模块
const index = require('./routes/index');
const account = require('./routes/account');
const events = require('./routes/events');
const calendar = require('./routes/calendar')

app.all('/', function (request, response, next) {
    let url = request.url;

    if (url === '/') {
        response.redirect('/index');
    } else {
        next()
    }

});

//注册路由
app.use('/index', index.view)
app.use('/account', account);
app.use('/events', events);
app.use('/calendar', calendar)
app.use(function (request, response) {
    response.send('This Page is Not Find');
})

//设置端口
const port = process.env.PORT || 3000;
//设置监听
const server = app.listen(port, (request, response) => {
    console.log('Express server listening on port %s', port);
});
