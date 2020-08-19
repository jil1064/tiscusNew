const mongoose=require('../mongo/mongo');
const autoIncrement=require('mongoose-auto-increment-reference');
autoIncrement.initialize(mongoose.connection);
const Schema=mongoose.Schema;

const calendarSchema=new Schema({
    calendar_id:{type:Number},
    date:{type:String},
    start_time:{type:String},
    end_time:{type:String},
    title:{type:String},
    color:{type:String},
    reoccur:{type:String},
    attendee: {type:Array},
    non_occur_dates:{type:Array}
});


//使用插件做自增字段
calendarSchema.plugin(autoIncrement.plugin,{
    model: 'calendarSchema',
    field: 'calendar_id',
    startAt: 1,
    incrementBy: 1
});
module.exports=mongoose.model("calendar",calendarSchema)

