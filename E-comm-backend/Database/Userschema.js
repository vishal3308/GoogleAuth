const mongoose=require('mongoose');

// ============Google Authentication===================

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{type: String, unique: true,required:true},
    registration_type:{
        type:String,
        default:"Local"
    },
    google_id:String,
    avatar:{
        type:String,
        default:'avatar.png'
    },
    registration_date:{
        type:Date,
        default:Date.now()
    }
})
module.exports=mongoose.model('users',userSchema);
