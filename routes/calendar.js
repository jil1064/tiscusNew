const express = require('express');
const router = express.Router();
//事件数据实体
const Calendar = require('../model/calendar');

/**
 * 测试添加事件方法
 * @author 风灵玄
 * @version 0.1
 * @ignore 创建时间 2020年7月26日
 * @ignore 上次修改时间 2020年7月26日
 */
router.get('/test', (request, response) => {
    //实例化事件对象(测试)
    let calendar = new Calendar({
        date:"2020-08-19",
        start_time:"14:00",
        end_time:"15:00",
        title:"测试事件",
        color:"#00CCFF",
        reoccur:"ONCE_A_WEEK",
        attendee:[1000000,1000001,1000002]
    });
    //调用保存方法
    calendar.save(function (error, result) {
        response.json({
            error: error,
            result: result
        });
    })
});
//暴露路由
module.exports = router;