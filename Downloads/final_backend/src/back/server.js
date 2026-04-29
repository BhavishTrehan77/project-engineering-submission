const cors=require('cors')
const express=require('express')
const { default: mongoose } = require('mongoose')
const router = require('./routes/userroutes')
const app=express()

app.use(express.json())
app.use(cors())




async function connectdb(){
    try{
        await mongoose.connect("mongodb://localhost:27017/5oclock")
        console.log("connection is created successfully")
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }
}
connectdb()

app.use("/api/v1/users",router)


app.listen(7000)