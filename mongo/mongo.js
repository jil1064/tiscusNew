const mongoose=require('mongoose');
const DB_URL="mongodb://tiscus:tiscus@123.57.54.248:27017/tiscus?authSource=tiscus";
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false,
    autoIndex: false, //不建立索引
    poolSize: 10, // 线程池大小
    bufferMaxEntries: false
};
//连接数据库
mongoose.connect(DB_URL,options);
//获得数据库连接
const db = mongoose.connection;
/**
 * 链接建立触发器
 */
db.on('connected', function () {
    console.log('Mongoose connected to ' + DB_URL);
});
/**
 * 链接错误触发器
 */
db.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});
/**
 * 链接关闭触发器
 */
db.on('disconnected', function () {
    console.log('Mongoose disconnected to'+DB_URL);
});

module.exports=mongoose;

