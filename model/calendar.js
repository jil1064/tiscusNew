const mongoose=require('../mongo/mongo');
const autoIncrement=require('mongoose-auto-increment-reference');
autoIncrement.initialize(mongoose.connection);
const Schema=mongoose.Schema;

const userSlotSchema=new Schema({
    slot_id:{type:Number},
    date:{type:String},
    start_time:{type:String},
    start_sort:{type:Number},
    end_time:{type:String},
    title:{type:String},
    color:{type:String},
    reoccur:{type:String},
    reoccur_start: {type:String},
    reoccur_end: {type:String},
    non_occur_dates:{type:Array}
});

const calendarSchema=new Schema({
    user_id:{type:Number},
    slot_id:{type:Number},
    date:{type:Date},
    dateString:{type:String},
    start_time:{type:String},
    start_sort:{type:Number},
    end_time:{type:String},
    title:{type:String},
    color:{type:String},
    reoccur:{type:String},
    reoccur_start:{type:Date},
    reoccur_end:{type:Date},
    non_occur:{type:String}
});

//使用插件做自增字段
calendarSchema.plugin(autoIncrement.plugin,{
    model: 'calendar',
    field: 'slot_id',
    startAt: 1,
    incrementBy: 1
});

//module.exports=mongoose.model("calendar",calendarSchema)
//module.exports=mongoose.model("userSlot",userSlotSchema)
exports.calendar=mongoose.model("calendar",calendarSchema)
//exports.userSlot=mongoose.model("userSlot",userSlotSchema)