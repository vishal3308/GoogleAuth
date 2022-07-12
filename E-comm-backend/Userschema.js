const mongoose=require('mongoose');
const findOrCreate=require('mongoose-findorcreate')

// ============Google Authentication===================

const userSchema=new mongoose.Schema({
    name:String,
    password:String,
    email:{type: String, unique: true},
    registration_type:String,
    google_id:String,
    avatar:String
})
userSchema.plugin(findOrCreate);
module.exports=mongoose.model('users',userSchema);
