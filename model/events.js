const mongoose = require('../mongo/mongo');
const autoIncrement = require('mongoose-auto-increment-reference');
autoIncrement.initialize(mongoose.connection);
const Schema = mongoose.Schema;

//参与者列表
const participants = Schema({
    //这里为了配合前端传输的数据临时改为String，需要改为Number
    userID: {type: String},
    status: {type: String, default: 'pending'}
});
//时间列表
const timeList = Schema({
    id: {type: Number},
    date: {type: String},
    startTime: {type: String},
    endTime: {type: String}
});
//投票结果
const preference = Schema({
    id: {type: Number},
    count: {type: Number},
});

const eventsSchema=Schema({
    eventID:{type:Number},
    creatorId:{type:Number},
    title:{type:String},
    duration:{type:String},
    constraint:{type:Array},
    notes:{type:String,default: ''},
    participants:[participants],
    timeList:[timeList],
    preference:[preference]
});


eventsSchema.plugin(autoIncrement.plugin,{
    model: 'events',
    field: 'eventID',
    startAt: 1,
    incrementBy: 1
});
module.exports=mongoose.model("events",eventsSchema);


