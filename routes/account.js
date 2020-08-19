const express = require('express');
const router = express.Router();
//用户数据实体
const Users = require('../model/users');
//加密模块
const crypto = require("crypto");
/**
 * 注册方法
 * @author FengXuan
 * @version 0.1
 * @ignore 创建时间 2020年7月26日
 * @ignore 上次修改时间 2020年7月26日
 */
router.post('/register', (request, response) => {
    //获得参数值
    let {username} = request.query;
    let {password} = request.query;
    let {email} = request.query;
    let {timeZone} = request.query;
    //创建MD5加密对象
    let md5 = crypto.createHash("md5");
    //MD5加密后的密码(实际项目中应对密码加密进行存储)
    password = md5.update(password).digest("hex");
    let user = new Users({
        "userName": username,
        "password": password,
        "email": email,
        "timeZone": timeZone,
        "registerTime":Date.now()
    });
    //保存数据
    user.save(function (error, result) {
        let msg = "注册成功";
        if (error) {
            msg = "注册失败"
        }
        //创建响应体(以JSON形式返回)
        response.json({
            msg: msg,
            error: error,
            result: result
        });
    })
    user = null;
})

router.get('/login',(require,response)=>{
    response.render('login')
})

router.get('/signup',(require,response)=>{
    response.render('signup')
})

/**
 * 查询用户信息
 * @author 风灵玄
 * @version 0.1
 * @ignore 创建时间 2020年08月05日
 */
router.get('/selectUsers',(request,response)=>{
    let {queryConditions}=request.query;
    let users;
    if (queryConditions!==undefined&&queryConditions.length>1){
        users=Users.find().regex('userName',queryConditions)
    }else{
        users=Users.find();
    }
    users.select('userID userName email');
    users.exec(function (error, result) {
        response.json(result);
    });
})

//暴露路由
module.exports = router;