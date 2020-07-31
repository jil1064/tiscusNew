const express = require('express');
const router = express.Router();
//事件数据实体
const Events = require('../model/events');
const data = {
    rsvp: ['ixd@ucsd.edu']
};
/**
 * 测试添加事件方法
 * @author 风灵玄
 * @version 0.1
 * @ignore 创建时间 2020年7月26日
 * @ignore 上次修改时间 2020年7月26日
 */
router.post('/test', (request, response) => {
    //实例化事件对象(测试)
    let events = new Events({
        creatorId: 1000001,
        title: 'This is a test events',
        duration: "2:00:00",
        constraint: ["Apr 19", "Apr 21"],
        participants: [{userID: 1000000}, {userID: 1000003}],
        timeList: [
            {
                id: 1,
                date: "Apr 19",
                startTime: "16:00:00",
                endTime: "18:00:00"
            }, {
                id: 2,
                date: "Apr 19",
                startTime: "18:00:00",
                endTime: "20:00:00"
            },
            {
                id: 3,
                date: "Apr 20",
                startTime: "18:00:00",
                endTime: "20:00:00"
            }]
    });
    //调用保存方法
    events.save(function (error, result) {
        response.json({
            error: error,
            result: result
        });
    })
});
/**
 * 提交表单事件
 * @author 风灵玄
 * @version 0.2
 * @ignore 创建时间 2020年7月26日
 * @ignore 上次修改时间 2020年8月1日
 */
router.post('/submitTc', (request, response) => {
    //标题
    let tcTitle = request.body.tcTitle;
    //说明
    let tcNotes = request.body.tcNotes;
    //持续时长
    let tcDuration = request.body.tcDuration;
    //时间约束
    let tcConstraint=request.body.tcConstraint;
    //用户列表(数组形式)
    let tcUsers = request.body.tcUsers.split(',');
    let creatorId = "1000001";
    let tcUsersArr= [];
    for (let tcUser of tcUsers) {
        tcUsersArr.unshift({userID:tcUser});
    }
    let events = new Events({
        creatorId: creatorId,
        title: tcTitle,
        notes: tcNotes,
        constraint:tcConstraint,
        duration: tcDuration,
        participants: tcUsersArr,
    });
    events.save(function (error, result) {
        let msg = "数据插入成功";
        if (error) {
            msg = "数据插入失败"
        }
        //创建响应体(以JSON形式返回)
        response.json({
            msg: msg,
            error: error,
            result: result
        });
    });
});


//暴露路由
module.exports = router;