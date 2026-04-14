const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const Schemadata=new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})
Schemadata.pre("save",async function(){
    const user=this
    if(user.isModified("password")){
        return
    }
    const hashedpassword=await bcrypt.hash(user.password,10)
    user.password=hashedpassword
})

const user=mongoose.model('user',Schemadata)
module.exports=user