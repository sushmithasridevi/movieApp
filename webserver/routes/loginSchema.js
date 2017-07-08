var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var loginSchema={
username:String,
password:String,
};
module.exports=mongoose.model('login',loginSchema);
