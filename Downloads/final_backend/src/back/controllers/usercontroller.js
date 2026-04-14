const serviceData=require('../services/userservices')

const getdata=async(req,resp)=>{
    const d=await serviceData.getingdata(req.query)
    resp.json(d)
}
const postdata=async(req,resp)=>{
    const d=await serviceData.postingdata(req.body)
    resp.json(d)
}
const patchdata=async(req,resp)=>{
    const d=await serviceData.patchingdata(req.params.id,req.body)
    resp.json(d)
}
const deletedata=async(req,resp)=>{
    const d=await serviceData.deletingdata(req.params.id)
    resp.json(d)
}
const Signup=async(req,resp)=>{
    const d=await serviceData.singup(req.body)
    resp.json(d)
}
const Login=async(req,resp)=>{
    const d=await serviceData.login(req.body.email,req.body.password)
    resp.status(200).cookie("token",d.token).json(d)
}
const forgotpassword=async(req,resp)=>{
    const d=await serviceData.forgotPassword(req.body.email)
    resp.json(d)
}
module.exports={
    getdata,
    postdata,
    patchdata,
    deletedata,
    Signup,
    Login,
    forgotpassword
}