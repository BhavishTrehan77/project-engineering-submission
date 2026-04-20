const express=require('express')
const mongoose=require('mongoose')
const User = require('./models/usermodel')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')
const nodemailer = require("nodemailer");
const app=express()
app.use(express.json())


async function connectdb(){
    await mongoose.connect("mongodb://localhost:27017/rbac")
    console.log("mongoose is connected successfully")
}
connectdb()


const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: "bhavishtrehan777@gmail.com",
        pass: "zwgvndegldaipjli"
    }
});
const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: "bhavishtrehan777@gmail.com",
            to,
            subject,
            text
        });

        console.log("Email sent:", info.response); // ✅ debug
    } catch (error) {
        console.log("Email error:", error);
        throw error; // 🔥 VERY IMPORTANT
    }
};
app.post("/signup",async(req,resp)=>{
    const{name,email,password}=req.body
    const data=await User.create({name,email,password})
    resp.json(data)
})
app.post("/login",async(req,resp)=>{
    const{email,password}=req.body
    const person=await User.findOne({email})
    if(!person){
        return resp.json({message:"person not found we are trying to find person"})
    }
    const isMatch=await bcrypt.compare(password,person.password)
    if(!isMatch){
        return resp.json({message:"password didnt match"})
    }
    const token=jwt.sign({id:person._id},"secretkey")
    resp.json({
        person,token
    })
})
app.post("/forgot", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await User.findOne({ email });

    // 🔐 Do not reveal user existence
    if (!user) {
      return res.status(200).json({
        message: "If email exists, reset link sent"
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 1000 * 60 * 15;

    await user.save({ validateBeforeSave: false });

    const resetURL = `http://localhost:3000/reset-password/${resetToken}`;

    const message = `Click this link to reset your password:
${resetURL}

This link will expire in 15 minutes.`;

    try {
      await sendEmail(user.email, "Password Reset", message);

      return res.status(200).json({
        message: "Reset link sent to email"
      });

    } catch (error) {
      console.log("EMAIL ERROR:", error);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save({ validateBeforeSave: false });

      return res.status(500).json({
        message: "Email failed to send"
      });
    }

  } catch (error) {
    console.log("SERVER ERROR:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
app.post("/reset-password/:token",async(req,resp)=>{
    const{newPassword}=req.body
    if(!newPassword || newPassword.length<=8){
        return resp.json({message:"password must be grater then or equal to eight"})
    }
    const hashedPassword=crypto.createHash('sha256').update(req.params.token).digest('hex')
    const person=await User.findOne({
        resetPasswordToken:hashedPassword,
        resetPasswordExpires:{$gt:Date.now()}
    })
    if(!person){
        return resp.json({message:"either token is expired or not valid"})
    }
    person.password=newPassword
    person.resetPasswordToken=null
    person.resetPasswordExpires=null
    await person.save()
    resp.json({message:"password is siccessfully changed now you can login this user with new password"})
})


app.post("/work",async(req,resp)=>{
    const data=await User.create(req.body)
    resp.json(data)
})
app.get("/data",async(req,resp)=>{
    let{sortBy,page=1,limit=5}=req.query
    page=Number(page)
    limit=Number(limit)
    let sortOption={}
    if(sortBy){
         const[field,order]=sortBy.split(":")
         sortOption[field]=order=='asc'?1:-1
    }
    let skip=(page-1)*limit
    const data=await User.find({}).sort(sortOption).skip(skip).limit(limit)
    resp.json(data)
})
app.listen(7000)