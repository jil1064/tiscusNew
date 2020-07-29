const express = require('express');
const router = express.Router();
//事件数据实体
const Events = require('../model/events');
const data = {
    rsvp: ['ixd@ucsd.edu']
};
/**
 * 测试添加事件方法
 * @author FengXuan
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
 * @author
 * @version 0.1
 * @ignore 创建时间 2020年7月26日
 * @ignore 上次修改时间 2020年7月26日
 */
router.post('/submitTc', (request, response) => {
    //获得tcTitle数据
    let tcTitle = request.body.tcTitle;
    let tcNotes = request.body.tcNotes;
    let tcDuration = request.body.tcDuration;
    let tcUsers = request.body.tcUsers.split(',');
    let creatorId = "1000001";
    let events = new Events({
        creatorId: creatorId,
        title: tcTitle,
        notes: tcNotes,
        duration: tcDuration,
        participants: tcUsers,
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