const mongoose=require('mongoose');

// ============Google Authentication===================

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:{type: String, unique: true},
    registration_type:String,
    google_id:String,
    avatar:String
})
module.exports=mongoose.model('users',userSchema);
