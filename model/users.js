const mongoose=require('../mongo/mongo');
const autoIncrement=require('mongoose-auto-increment-reference');
autoIncrement.initialize(mongoose.connection);
const Schema=mongoose.Schema;

const usersSchema=new Schema({
    //用户ID(唯一,且用户不可操作)
    userID:{type:Number},
    //用户名
    userName:{type:String},
    //密码，存储时需要加密后存储
    password:{type:String},
    //邮箱，唯一的
    email:{type:String,unique:true,dropDups: true},
    //时区
    timeZone:{type:String},
    //注册时间(默认值为服务器时间)
    registerTime:{type:Date,default:Date.now()}
});
//使用插件做自增字段
usersSchema.plugin(autoIncrement.plugin,{
    model: 'test_users',
    field: 'userID',
    startAt: 1000000,
    incrementBy: 1
});
module.exports=mongoose.model("users",usersSchema)

