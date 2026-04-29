const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },role:{
        type:String,
        enum:['user','admin','moderator'],
        default:'user'
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date

})
userSchema.pre("save",async function(){
    const hashedPassword=await bcrypt.hash(this.password,10)
    this.password=hashedPassword
})
const User=mongoose.model('User',userSchema)
module.exports=User