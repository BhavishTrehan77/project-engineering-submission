const express=require('express')
const { getdata, postdata, patchdata, deletedata, Signup, Login, forgotpassword } = require('../controllers/usercontroller')
const router=express.Router()




router.get("/",getdata)
router.post("/",postdata)
router.patch("/:id",patchdata)
router.delete("/:id",deletedata)
router.post("/signup",Signup)
router.post("/login",Login)
router.post("/forgotpassword",forgotpassword)
module.exports=router