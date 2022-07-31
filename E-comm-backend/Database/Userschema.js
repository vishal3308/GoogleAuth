const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
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
userSchema.pre('save',async function(next){
    if(this.isModified('password')){ //only hash the password if it has been modified (or is new)
       await bcrypt.hash(this.password,10).then(hash=>{
        this.password=hash;
        next();
       }).catch(err=>next(err))
    }
    next();
})

module.exports=mongoose.model('users',userSchema);
