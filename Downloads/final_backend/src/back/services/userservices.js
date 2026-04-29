const user = require("../models/userschema")
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const bcrypt=require('bcrypt')
const { default: mongoose } = require("mongoose")



const getingdata=async(query)=>{
    const{sortBy,name}=query
    let sortOptions={}
    if(sortBy){
        const[q,f]=sortBy.split(":")
        sortOptions[q]=f==='asc'?1:-1
    }
    let filter={}
    if(name){
        filter.name=name
    }
    return await user.find(filter).sort(sortOptions)
}
const postingdata=async(data)=>{
    return await user.create(data)
}
const patchingdata=async(id,data)=>{
    return await user.findByIdAndUpdate(id,data,{new:true})
}
const deletingdata=async(id)=>{
    return await user.findByIdAndDelete(id)
}
const singup=async(data)=>{
    return await user.create(data)
}
const login=async(email,password)=>{
    const data=await user.findOne({email})
    if(!user){
        throw new Error("user not found")
    }
    const isMatch=await bcrypt.compare(password,data.password)
    const token=jwt.sign({id:data._id},"secretKey")
    return {data,token}
}
const forgotPassword=async(email)=>{
    const d=await user.findOne({email})
    if(!d){
        throw new Error("user not found")
    }
    const resetToken=crypto.randomBytes(32).toString('hex')
    const hashedToken=crypto.createHash('sha256').update(resetToken).digest('hex')
    return{resetToken,hashedToken}
}
module.exports={
    getingdata,
    postingdata,
    patchingdata,
    deletingdata,
    singup,
    login,
    forgotPassword
}