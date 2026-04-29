const Authentification=(req,resp,next)=>{
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer ")){
        const token=req.headers.authorization.split(" ")[1]
        try{
            const decoded=jwt.verify(token,"secretKey")
            req.user=decoded.id
            next()
        }catch(err){
            resp.status(401).json({message:"Unauthorized"})
        }
        next()

    }
}
module.exports=Authentification