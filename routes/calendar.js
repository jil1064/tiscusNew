const moment = require('moment');
const express = require('express');
const router = express.Router();
const oneWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//事件数据实体
const CalendarModel = require('../model/calendar').calendar;
//const userSlot = calendar.userSlot;
//const userSlot = require('../model/calendar').userSlot;
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
        slot_id: 6,
        date: new Date(2020, 7, 28),
        start_time: "14:00",
        end_time: "15:00",
        title: "测试事件",
        color: 4,
        reoccur: "",
        reoccur_start: new Date(2012, 7, 14),
        reoccur_end: new Date(2012, 8, 14),
        user_id: ""
    });
    //调用保存方法
    calendar.save(function (error, result) {
        response.json({
            error: error,
            result: result
        });
    })
});



router.post('/showDayEvents', (req, res) => {
    let date = req.body.targetDate; //is a string, "2020-08-27"
    let weeklyDay = oneWeek[moment(date).day()];
    let monthlyDay = date.substr(8, 2);
    let yearlyDay = date.substr(5, 5);
    console.log(yearlyDay);
    console.log(req.session);
//    let userArr=req.session.LOGIN_USER.userSlot;  
//    Will add the line above with test users
    let userArr = [2,3,4,5];

    CalendarModel.find({
      $and: [
        {slot_id: {$in:userArr}, non_occur: { $not: { $regex: date } } },
        {
          $or: [
            {date: date},
            {$and: [
                {reoccur_start: {"$lt": moment(date).subtract(1, 'day')}, reoccur_end: {"$gte": new Date(date)}},
                {$or: [
                    {reoccur: {$regex: 'Daily'}},
                    {reoccur: {$regex: weeklyDay}}, //weeklyDay = 'Thu', get from target date
                    {reoccur: {$regex: 'Monthly'}, dateString: new RegExp(monthlyDay + '$')}, // '27'
                    {reoccur: {$regex: 'Yearly'}, dateString: {$regex: yearlyDay}} //'08-27'
                  ]
                }
              ]
            }
          ]
        }
      ]
    }).sort({start_sort: 1}).exec(function (err, result) {
        console.log(result);
        res.json(result);
    });
});





//暴露路由
module.exports = router;