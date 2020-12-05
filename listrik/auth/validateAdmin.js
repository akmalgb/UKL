const jwt=require("jsonwebtoken")
const secretKeyAdmin="admin123"

ValidateAdmin=(req,res,next)=>{
    let header = req.headers.authorization
    let token = header?header.split(" ")[1] : null
    let jwtHeader = {algorithm:"HS256"}

    if(token==null){
        return res.json({message: "non authorized"})
    }else{
        jwt.verify(token, secretKeyAdmin,jwtHeader,(error, user)=>{
            if(error){
                return res.json({message:"token invalid"})
            }else{
                next()
            }
        })
    }
}

module.exports = ValidateAdmin